# uniforms-masked-phone-field

React component for unifroms-material with input mask

## Install

```bash
npm i styleschool/uniforms-masked-phone-field
```

## Example

```jsx
import { MaskedUniformsPhoneField } from 'uniforms-masked-phone-field';
import { AutoForm, AutoField } from 'uniforms-material';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms/SimpleSchema2Bridge';

const Bridge = new SimpleSchema2Bridge(new SimpleSchema({
  phone: {
    type: String,
    uniforms: {
      component: (props: any) => <MaskedUniformsPhoneField {...props} />,
    },
  },
  // Region filed auto-implemented in MaskedUniformsPhoneField.
  // It have no need to be placed in Autoform manualy.
  // ATTEMPT! You must use AutoForm component with AutoFiled, but not by itself.
  region: {
    type: String,
  }
}));

<AutoForm schema={Bridge}>
  <AutoField filed="phone"/>
</AutoForm>
```