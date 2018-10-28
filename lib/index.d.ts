import * as React from 'react';
import { maskArray } from 'react-text-mask';
export interface UniformsMaskedPhoneFieldStates {
    lang: string;
    anchorEl?: HTMLElement | null;
    mask: maskArray | ((value: string) => maskArray);
    disabled: boolean;
}
export interface UniformsMaskedPhoneFieldProps {
    showMenu: boolean;
    countries: any;
    regionFieldName: string;
}
export default class UniformsMaskedPhoneField<P extends UniformsMaskedPhoneFieldProps, S extends UniformsMaskedPhoneFieldStates> extends React.Component<any, any> {
    static contextTypes: any;
    state: {
        lang: any;
        anchorEl: any;
        mask: any;
        disabled: boolean;
    };
    static defaultProps: {
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
    handleClose: () => void;
    handleLang: (lang: any) => void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
