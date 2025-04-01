export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
    };
  }
}

export class ValidationError extends AppError {}

export class NotFoundError extends AppError {}

export class DomainError extends AppError {}

export class InfrastructureError extends AppError {}
