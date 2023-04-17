export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error?: Nullable<Error>;
  private readonly _value?: T;

  private constructor(error?: Nullable<Error>, value?: T) {
    if (error == null) {
      this.isFailure = false;
      this.isSuccess = true;
    } else {
      this.isFailure = true;
      this.isSuccess = false;
    }
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error(`Cant retrieve the value from a failed result.`);
    }

    return this._value!;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(null, value);
  }

  public static fail<U>(error: Error): Result<U> {
    return new Result<U>(error);
  }
}
