/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Driver } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type DriverUpdateFormInputValues = {
    name?: string;
    sub?: string;
    lat?: number;
    lng?: number;
    transportationMode?: string;
};
export declare type DriverUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    sub?: ValidationFunction<string>;
    lat?: ValidationFunction<number>;
    lng?: ValidationFunction<number>;
    transportationMode?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DriverUpdateFormOverridesProps = {
    DriverUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    sub?: PrimitiveOverrideProps<TextFieldProps>;
    lat?: PrimitiveOverrideProps<TextFieldProps>;
    lng?: PrimitiveOverrideProps<TextFieldProps>;
    transportationMode?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type DriverUpdateFormProps = React.PropsWithChildren<{
    overrides?: DriverUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    driver?: Driver;
    onSubmit?: (fields: DriverUpdateFormInputValues) => DriverUpdateFormInputValues;
    onSuccess?: (fields: DriverUpdateFormInputValues) => void;
    onError?: (fields: DriverUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DriverUpdateFormInputValues) => DriverUpdateFormInputValues;
    onValidate?: DriverUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DriverUpdateForm(props: DriverUpdateFormProps): React.ReactElement;
