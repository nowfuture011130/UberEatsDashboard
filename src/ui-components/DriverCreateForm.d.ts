/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DriverCreateFormInputValues = {
    name?: string;
    sub?: string;
    lat?: number;
    lng?: number;
    transportationMode?: string;
};
export declare type DriverCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    sub?: ValidationFunction<string>;
    lat?: ValidationFunction<number>;
    lng?: ValidationFunction<number>;
    transportationMode?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DriverCreateFormOverridesProps = {
    DriverCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    sub?: PrimitiveOverrideProps<TextFieldProps>;
    lat?: PrimitiveOverrideProps<TextFieldProps>;
    lng?: PrimitiveOverrideProps<TextFieldProps>;
    transportationMode?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type DriverCreateFormProps = React.PropsWithChildren<{
    overrides?: DriverCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DriverCreateFormInputValues) => DriverCreateFormInputValues;
    onSuccess?: (fields: DriverCreateFormInputValues) => void;
    onError?: (fields: DriverCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DriverCreateFormInputValues) => DriverCreateFormInputValues;
    onValidate?: DriverCreateFormValidationValues;
} & React.CSSProperties>;
export default function DriverCreateForm(props: DriverCreateFormProps): React.ReactElement;
