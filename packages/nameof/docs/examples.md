# @twin.org/nameof - Examples

## `nameof<T>`

One of the internal transformers in the TypeScript compiler will reduce an interface to no code, which means that at runtime the type information is missing. So operations where you might like to find the name of a class/type etc are not available.

We have many places in our code where we want to use the name of the class, we could do the following.

```typescript
export class MyClass {
  public static className(): string {
    return 'MyClass';
  }
}
console.log(MyClass.className()); // Outputs "MyClass"
```

But if you changed the name of the class you would have to make sure you also replaced all string instances where it was mentioned as well, this is prone to lots of errors.

We can use the `nameof` transformer as follows.

```typescript
import { nameof } from '@twin.org/nameof';

export class MyClass {
  public static className(): string {
    return nameof<MyClass>();
  }
}
console.log(MyClass.className()); // Outputs "MyClass"
```

Now if we rename `MyClass` without updating the references in the `nameof` call we will get a compiler error, code auto refactoring would actually perform the rename for us.

Since `nameof` is performed as a compile time transform, the actual code produced looks like this.

```javascript
export class MyClass {
    static public className(): string {
        return "MyClass";
    }
}
console.log(MyClass.className()); // Outputs "MyClass"
```

This means there is no additional overheads in function calls at runtime.

## `nameof(propName)`

The `nameof(propName)` transform behaves in much the same way as `nameof<T>`, but instead works on properties passed to it.

```typescript
import { nameof } from '@twin.org/nameof';

export class MyClass {
  public static propName(aProp: string): string {
    return nameof(aProp);
  }
}
console.log(MyClass.propName()); // Outputs "aProp"
```

You can also used it with chained properties, nullish operators can also be used, but are removed.

```typescript
import { nameof } from '@twin.org/nameof';

export class MyClass {
  public static propName(aProp: { inner?: boolean }): string {
    return nameof(aProp?.inner);
  }
}
console.log(MyClass.propName()); // Outputs "aProp.inner"
```
