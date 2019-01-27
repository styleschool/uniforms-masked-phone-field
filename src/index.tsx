import * as React from 'react';
import { IconButton, Menu, MenuItem, InputAdornment } from '@material-ui/core';
import TextMask, { maskArray } from 'react-text-mask';
import { allCountries } from 'country-telephone-data';
import { TextField as UniformsTextField, HiddenField } from 'uniforms-material';
import BaseField from 'uniforms/BaseField';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

var defaultMasks = [
  {
    name: 'universal',
    iso2: 'universal',
    format: '*',
    dialCode: '',
  },
];

for (var m = 0; m < allCountries.length; m++) {
  if (allCountries[m].format) {
    defaultMasks.push(allCountries[m]);
  }
}

function createMask(lang: any, masks: any) {
  for (let i = 0; i < masks.length; i++) {
    if (masks[i].iso2 === lang) {
      let code = (masks[i].dialCode + '').split('');
      let mask: any = masks[i].format.split('');
      for (let j = 0, count = 0; j < mask.length && masks[i].format; j++) {
        if (mask && mask[j] === '.') {
          if (code[count]) {
            mask[j] = code[count];
            count++;
          } else mask[j] = /\d/;
        }
      }
      if (mask && mask[0] === '*') mask = false;
      return mask;
    }
  }
}

class MaskedInput extends React.Component<any, any> {
  render() {
    const { inputRef, mask, ...props } = this.props;
    return (
      <TextMask
        {...props}
        ref={inputRef}
        mask={mask}
        placeholderChar={'\u2000'}
        showMask={Boolean(mask)}
      />
    );
  }
}

export interface UniformsMaskedPhoneFieldStates {
  lang: string;
  anchorEl?: HTMLElement | null;
  mask: maskArray | ((value: string) => maskArray);
  disabled: boolean;
  search: string;
}

export interface UniformsMaskedPhoneFieldProps {
  showMenu: boolean;
  countries: any;
  regionFieldName: string;
  recommendedCodes: number[];
  search: boolean;
}

export default class UniformsMaskedPhoneField<
  P extends UniformsMaskedPhoneFieldProps,
  S extends UniformsMaskedPhoneFieldStates
> extends React.Component<any, any> {
  static contextTypes = BaseField.contextTypes;
  state = {
    lang: this.context.uniforms.model[this.props.regionFieldName],
    anchorEl: null,
    mask: createMask(
      this.context.uniforms.model[this.props.regionFieldName],
      this.props.countries,
    ),
    disabled: false,
    search: '',
  };
  static defaultProps = {
    showMenu: true,
    countries: defaultMasks,
    regionFieldName: 'region',
    recommendedCodes: [],
  };

  handleClick = (event: any) =>
    this.setState({ anchorEl: event.currentTarget });

  handleClose = () => this.setState({ anchorEl: null });

  handleLang = (lang: any) =>
    this.setState({
      lang,
      anchorEl: null,
      mask: createMask(lang, this.props.countries),
      disabled: true,
    });
  componentDidUpdate() {
    if (this.state.disabled) this.setState({ disabled: false });
  }
  render() {
    const { anchorEl, lang } = this.state;
    const {
      showMenu,
      regionFieldName,
      recommendedCodes,
      ...props
    } = this.props;
    return (
      <span>
        {this.state.disabled ? null : (
          <UniformsTextField
            {...props}
            inputProps={{ mask: this.state.mask }}
            InputProps={{
              inputComponent: MaskedInput,
              startAdornment: this.props.showMenu ? (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="More"
                    aria-owns={anchorEl ? 'Lang-manu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="Lang-manu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    MenuListProps={{
                      style: {
                        paddingTop: 0,
                      },
                    }}
                    PaperProps={{
                      style: {
                        maxHeight: 216,
                        width: 200,
                      },
                    }}
                  >
                    {this.props.search !== false && (
                      <Paper
                        style={{
                          position: 'sticky',
                          background: 'white',
                          top: 0,
                          left: 0,
                          width: '100%',
                          zIndex: 1,
                        }}
                      >
                        <TextField
                          autoFocus={true}
                          value={this.state.search}
                          onChange={event =>
                            this.setState({ search: event.target.value })
                          }
                        />
                      </Paper>
                    )}
                    {this.props.countries.map((current: any) => {
                      const text = current.dialCode + ' ' + current.name;
                      if (
                        this.state.search &&
                        !~(' ' + text.toLowerCase()).indexOf(this.state.search)
                      )
                        return null;
                      return (
                        <MenuItem
                          key={current.iso2}
                          selected={current.iso2 === lang}
                          onClick={() => this.handleLang(current.iso2)}
                        >
                          {text}
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </InputAdornment>
              ) : null,
            }}
            label={false}
          />
        )}
        <HiddenField name={regionFieldName} value={this.state.lang} />
      </span>
    );
  }
}
