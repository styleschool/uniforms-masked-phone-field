"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@material-ui/core");
const react_text_mask_1 = require("react-text-mask");
const country_telephone_data_1 = require("country-telephone-data");
const uniforms_material_1 = require("uniforms-material");
const MoreVert_1 = require("@material-ui/icons/MoreVert");
var defaultMasks = [{
        name: 'universal',
        iso2: 'universal',
        format: '*',
        dialCode: '',
    }];
for (var m = 0; m < country_telephone_data_1.allCountries.length; m++) {
    if (country_telephone_data_1.allCountries[m].format) {
        defaultMasks.push(country_telephone_data_1.allCountries[m]);
    }
}
function createMask(lang) {
    for (let i = 0; i < country_telephone_data_1.allCountries.length; i++) {
        if (country_telephone_data_1.allCountries[i].iso2 === lang) {
            let code = (country_telephone_data_1.allCountries[i].dialCode + '').split('');
            let mask = country_telephone_data_1.allCountries[i].format.split('');
            for (let j = 0, count = 0; j < mask.length && country_telephone_data_1.allCountries[i].format; j++) {
                if (mask && mask[j] === '.') {
                    if (code[count]) {
                        mask[j] = code[count];
                        count++;
                    }
                    else
                        mask[j] = /\d/;
                }
            }
            if (mask && mask[0] === '*')
                mask = false;
            return mask;
        }
    }
}
class MaskedInput extends React.Component {
    render() {
        const { inputRef, mask, ...props } = this.props;
        return React.createElement(react_text_mask_1.default, Object.assign({}, props, { ref: inputRef, mask: mask, placeholderChar: '\u2000', showMask: Boolean(mask), keepCharPositions: true }));
    }
}
class MaskedUniformsPhoneField extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = (event) => this.setState({ anchorEl: event.currentTarget });
        this.handleLang = (lang) => this.setState({ lang, anchorEl: null, mask: createMask(lang), disabled: true });
        this.state = {
            lang: this.props.country,
            anchorEl: null,
            mask: createMask(this.props.country),
            disabled: false,
        };
    }
    componentDidUpdate() {
        if (this.state.disabled)
            this.setState({ disabled: false });
    }
    render() {
        const { anchorEl, lang } = this.state;
        const { country, showMenu, ...props } = this.props;
        return React.createElement("span", null, this.state.disabled ? null : React.createElement(uniforms_material_1.TextField, Object.assign({}, props, { inputProps: { mask: this.state.mask }, InputProps: {
                inputComponent: MaskedInput,
                startAdornment: this.props.showMenu ? (React.createElement(core_1.InputAdornment, { position: "start" },
                    React.createElement(core_1.IconButton, { "aria-label": "More", "aria-owns": anchorEl ? 'Lang-manu' : null, "aria-haspopup": "true", onClick: this.handleClick },
                        React.createElement(MoreVert_1.default, null)),
                    React.createElement(core_1.Menu, { id: "Lang-manu", anchorEl: anchorEl, open: Boolean(anchorEl), PaperProps: {
                            style: {
                                maxHeight: 216,
                                width: 200,
                            },
                        } }, this.props.countries.map((current) => (React.createElement(core_1.MenuItem, { key: current.iso2, selected: current.iso2 === lang, onClick: () => this.handleLang(current.iso2) }, current.dialCode + ' ' + current.name)))))) : null,
            }, label: false })));
    }
}
MaskedUniformsPhoneField.defaultProps = {
    country: 'ru',
    showMenu: true,
    // tslint:disable-next-line:object-shorthand-properties-first
    countries: country_telephone_data_1.allCountries,
};
exports.MaskedUniformsPhoneField = MaskedUniformsPhoneField;
//# sourceMappingURL=field.js.map