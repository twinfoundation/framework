# Interface: IViewMemberDescriptor\<T\>

Definition of a view member.

## Type parameters

| Name |
| :--- |
| `T`  |

## Properties

### isPrimary

• `Optional` **isPrimary**: `boolean`

Is this the primary index property.

#### Defined in

[models/IViewMemberDescriptor.ts:16](https://github.com/gtscio/framework/blob/51767d6/packages/entity/src/models/IViewMemberDescriptor.ts#L16)

---

### isSecondary

• `Optional` **isSecondary**: `boolean`

Is this a secondary index property.

#### Defined in

[models/IViewMemberDescriptor.ts:21](https://github.com/gtscio/framework/blob/51767d6/packages/entity/src/models/IViewMemberDescriptor.ts#L21)

---

### name

• **name**: keyof `T`

The name of the property.

#### Defined in

[models/IViewMemberDescriptor.ts:11](https://github.com/gtscio/framework/blob/51767d6/packages/entity/src/models/IViewMemberDescriptor.ts#L11)
