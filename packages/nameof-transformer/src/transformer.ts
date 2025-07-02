// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import * as ts from "typescript";

/**
 * The transformer factory entry point.
 * @param context The context for the factory.
 * @returns The transformed node.
 */
export const transformerFactory: ts.TransformerFactory<ts.Node> = transformer;

/**
 * Transform all the nodes in a context.
 * @param context The context to traverse.
 * @returns A transformer for the context.
 */
export function transformer(context: ts.TransformationContext): ts.Transformer<ts.Node> {
	return (node: ts.Node) => {
		if (ts.isSourceFile(node)) {
			return visitNodeAndChildren(context, node);
		}

		return node;
	};
}

/**
 * Visit the node and children in a context.
 * @param context The context to traverse.
 * @param node The node being visited.
 * @returns The updated node.
 */
function visitNodeAndChildren(context: ts.TransformationContext, node: ts.Node): ts.Node {
	if (!node) {
		return node;
	}

	node = ts.visitEachChild(node, childNode => visitNodeAndChildren(context, childNode), context);

	return visitNode(node);
}

/**
 * Update a node in the tree.
 * @param node The node to update.
 * @returns The updated node.
 */
function visitNode(node: ts.Node): ts.Node {
	if (ts.isCallExpression(node)) {
		let expressionText;

		try {
			expressionText = node.expression.getText();
		} catch {}

		// Is this a call to nameof<Type>(), if so just replace with a string e.g. "Type"
		if (expressionText === "nameof" && node.typeArguments && node.typeArguments.length === 1) {
			let typeName;
			if (ts.isTypeReferenceNode(node.typeArguments[0])) {
				typeName = node.typeArguments[0].typeName.getText();
			} else if (ts.isArrayTypeNode(node.typeArguments[0])) {
				typeName = `${node.typeArguments[0].elementType.getText()}[]`;
			}

			if (typeName) {
				return ts.factory.createStringLiteral(typeName);
			}
		} else if (expressionText === "nameof" && node.arguments && node.arguments.length >= 1) {
			// This is an nameof(propName, ?optionalParent) call.
			// Return the whole property path as the string, but remove any chaining operators
			// The second parameter is an optional string, if set change the top level owner
			// in the property path
			const propertyPath = node.arguments[0].getText().replace(/\?/g, "");
			if (node.arguments.length === 2) {
				const parts = propertyPath.split(".");
				if (parts.length > 1) {
					parts[0] = "";
					return ts.factory.createBinaryExpression(
						ts.factory.createIdentifier(node.arguments[1].getText()),
						ts.factory.createToken(ts.SyntaxKind.PlusToken),
						ts.factory.createStringLiteral(parts.join("."))
					);
				}
			}
			return ts.factory.createStringLiteral(propertyPath);
		}
	} else if (
		ts.isImportDeclaration(node) &&
		node.moduleSpecifier.getText().includes("@twin.org/nameof")
	) {
		// Is this an import of @twin.org/nameof
		// e.g. import { nameof } from "@twin.org/nameof";
		// if it is then return undefined to remove the node
		return undefined as unknown as ts.Node;
	}

	return node;
}
