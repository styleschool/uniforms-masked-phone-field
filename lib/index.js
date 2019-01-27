"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_1 = require("@material-ui/core");
const react_text_mask_1 = require("react-text-mask");
const country_telephone_data_1 = require("country-telephone-data");
const uniforms_material_1 = require("uniforms-material");
const BaseField_1 = require("uniforms/BaseField");
const MoreVert_1 = require("@material-ui/icons/MoreVert");
const TextField_1 = require("@material-ui/core/TextField");
const Paper_1 = require("@material-ui/core/Paper");
var defaultMasks = [
    {
        name: 'universal',
        iso2: 'universal',
        format: '*',
        dialCode: '',
    },
];
for (var m = 0; m < country_telephone_data_1.allCountries.length; m++) {
    if (country_telephone_data_1.allCountries[m].format) {
        defaultMasks.push(country_telephone_data_1.allCountries[m]);
    }
}
function createMask(lang, masks) {
    for (let i = 0; i < masks.length; i++) {
        if (masks[i].iso2 === lang) {
            let code = (masks[i].dialCode + '').split('');
            let mask = masks[i].format.split('');
            for (let j = 0, count = 0; j < mask.length && masks[i].format; j++) {
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
        const _a = this.props, { inputRef, mask } = _a, props = __rest(_a, ["inputRef", "mask"]);
        return (React.createElement(react_text_mask_1.default, Object.assign({}, props, { ref: inputRef, mask: mask, placeholderChar: '\u2000', showMask: Boolean(mask) })));
    }
}
class UniformsMaskedPhoneField extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            lang: this.context.uniforms.model[this.props.regionFieldName],
            anchorEl: null,
            mask: createMask(this.context.uniforms.model[this.props.regionFieldName], this.props.countries),
            disabled: false,
            search: '',
        };
        this.handleClick = (event) => this.setState({ anchorEl: event.currentTarget });
        this.handleClose = () => this.setState({ anchorEl: null });
        this.handleLang = (lang) => this.setState({
            lang,
            anchorEl: null,
            mask: createMask(lang, this.props.countries),
            disabled: true,
        });
    }
    componentDidUpdate() {
        if (this.state.disabled)
            this.setState({ disabled: false });
    }
    render() {
        const { anchorEl, lang } = this.state;
        const _a = this.props, { showMenu, regionFieldName, recommendedCodes } = _a, props = __rest(_a, ["showMenu", "regionFieldName", "recommendedCodes"]);
        return (React.createElement("span", null,
            this.state.disabled ? null : (React.createElement(uniforms_material_1.TextField, Object.assign({}, props, { inputProps: { mask: this.state.mask }, InputProps: {
                    inputComponent: MaskedInput,
                    startAdornment: this.props.showMenu ? (React.createElement(core_1.InputAdornment, { position: "start" },
                        React.createElement(core_1.IconButton, { "aria-label": "More", "aria-owns": anchorEl ? 'Lang-manu' : null, "aria-haspopup": "true", onClick: this.handleClick },
                            React.createElement(MoreVert_1.default, null)),
                        React.createElement(core_1.Menu, { id: "Lang-manu", anchorEl: anchorEl, open: Boolean(anchorEl), onClose: this.handleClose, MenuListProps: {
                                style: {
                                    paddingTop: 0,
                                },
                            }, PaperProps: {
                                style: {
                                    maxHeight: 216,
                                    width: 200,
                                },
                            } },
                            this.props.search !== false && (React.createElement(Paper_1.default, { style: {
                                    position: 'sticky',
                                    background: 'white',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    zIndex: 1,
                                } },
                                React.createElement(TextField_1.default, { autoFocus: true, value: this.state.search, onChange: event => this.setState({ search: event.target.value }) }))),
                            this.props.countries.map((current) => {
                                const text = current.dialCode + ' ' + current.name;
                                if (this.state.search &&
                                    !~(' ' + text.toLowerCase()).indexOf(this.state.search))
                                    return null;
                                return (React.createElement(core_1.MenuItem, { key: current.iso2, selected: current.iso2 === lang, onClick: () => this.handleLang(current.iso2) }, text));
                            })))) : null,
                }, label: false }))),
            React.createElement(uniforms_material_1.HiddenField, { name: regionFieldName, value: this.state.lang })));
    }
}
UniformsMaskedPhoneField.contextTypes = BaseField_1.default.contextTypes;
UniformsMaskedPhoneField.defaultProps = {
    showMenu: true,
    countries: defaultMasks,
    regionFieldName: 'region',
    recommendedCodes: [],
};
exports.default = UniformsMaskedPhoneField;
//# sourceMappingURL=index.js.map