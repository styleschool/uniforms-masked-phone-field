import * as React from 'react';
import { IconButton, Menu, MenuItem, InputAdornment } from '@material-ui/core';
import TextMask from 'react-text-mask';
import { allCountries } from 'country-telephone-data';
import { TextField as UniformsTextField  } from 'uniforms-material';
import MoreVertIcon from '@material-ui/icons/MoreVert';

var defaultMasks = [{
  name: 'universal',
  iso2: 'universal',
  format: '*',
  dialCode: '',
}];

for (var m = 0; m < allCountries.length; m++) {
  if (allCountries[m].format) {
    defaultMasks.push(allCountries[m]);
  }
}

function createMask(lang: any): any {
  for (let i = 0; i < allCountries.length; i++) {
    if (allCountries[i].iso2 === lang) {
      let code = (allCountries[i].dialCode + '').split('');
      let mask = allCountries[i].format.split('');
      for (let j = 0, count = 0; j < mask.length && allCountries[i].format; j++) {
        if (mask && mask[j] === '.') {
          if (code[count]) {
            mask[j] = code[count];
            count++;
          }
          else mask[j] = /\d/;
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
    return <TextMask { ...props }
      ref={inputRef}
      mask={mask}
      placeholderChar={'\u2000'}
      showMask={Boolean(mask)}
      keepCharPositions
    />;
  }
}

export class MaskedUniformsPhoneField extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      lang: this.props.country,
      anchorEl: null,
      mask: createMask(this.props.country),
      disabled: false,
    };
  }
  static defaultProps = {
    country: 'ru',
    showMenu: true,
    // tslint:disable-next-line:object-shorthand-properties-first
    countries: allCountries,
  };

  handleClick = (event: any) => this.setState({ anchorEl: event.currentTarget });
  handleLang = (lang: any) => this.setState({ lang, anchorEl: null, mask: createMask(lang), disabled: true });
  componentDidUpdate() {
    if (this.state.disabled) this.setState({ disabled: false });
  }
  render() {
    const { anchorEl, lang } = this.state;
    const { country, showMenu, ...props } = this.props;
    return <span>
      {this.state.disabled ? null : <UniformsTextField
        {... props}
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
                PaperProps={{
                  style: {
                    maxHeight: 216,
                    width: 200,
                  },
                }}
              >
                {this.props.countries.map((current : any) => (
                  <MenuItem key={current.iso2} selected={current.iso2 === lang} onClick={() => this.handleLang(current.iso2)}>
                    {current.dialCode + ' ' + current.name}
                  </MenuItem>
                ))}
              </Menu>
            </InputAdornment>
          ) : null ,
        }}
        label={false}
      />}
    </span>;
  }
}
