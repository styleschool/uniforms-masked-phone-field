import * as React from 'react';
import { maskArray } from 'react-text-mask';
export interface UniformsMaskedPhoneFieldStates {
    lang: string;
    anchorEl?: HTMLElement | null;
    mask: maskArray | ((value: string) => maskArray);
    disabled: boolean;
}
export interface UniformsMaskedPhoneFieldProps {
    country: string;
    showMenu: boolean;
    countries: any;
    regionFieldName: string;
}
export default class UniformsMaskedPhoneField<P extends UniformsMaskedPhoneFieldProps, S extends UniformsMaskedPhoneFieldStates> extends React.Component<any, any> {
    state: {
        lang: any;
        anchorEl: any;
        mask: any;
        disabled: boolean;
    };
    static defaultProps: {
        country: string;
        showMenu: boolean;
        countries: {
            name: string;
            iso2: string;
            format: string;
            dialCode: string;
        }[];
        regionFieldName: string;
    };
    handleClick: (event: any) => void;
    handleLang: (lang: any) => void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
