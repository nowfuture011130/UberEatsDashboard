/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { User2 } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type User2UpdateFormInputValues = {
    name?: string;
    address?: string;
    lat?: number;
    lng?: number;
    sub?: string;
};
export declare type User2UpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    lat?: ValidationFunction<number>;
    lng?: ValidationFunction<number>;
    sub?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type User2UpdateFormOverridesProps = {
    User2UpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    lat?: PrimitiveOverrideProps<TextFieldProps>;
    lng?: PrimitiveOverrideProps<TextFieldProps>;
    sub?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type User2UpdateFormProps = React.PropsWithChildren<{
    overrides?: User2UpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    user2?: User2;
    onSubmit?: (fields: User2UpdateFormInputValues) => User2UpdateFormInputValues;
    onSuccess?: (fields: User2UpdateFormInputValues) => void;
    onError?: (fields: User2UpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: User2UpdateFormInputValues) => User2UpdateFormInputValues;
    onValidate?: User2UpdateFormValidationValues;
} & React.CSSProperties>;
export default function User2UpdateForm(props: User2UpdateFormProps): React.ReactElement;
