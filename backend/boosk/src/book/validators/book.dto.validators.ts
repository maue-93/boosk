import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

// Custom decorator for validating Roman numerals or numbers
export function IsRomanOrNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsRomanOrNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value === 'number') {
            return true; // Valid if it's a number
          }
          if (typeof value === 'string') {
            // Roman numeral regex validation
            return /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(
              value,
            );
          }
          return false; // Invalid if neither
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be either a valid number or a Roman numeral.`;
        },
      },
    });
  };
}
