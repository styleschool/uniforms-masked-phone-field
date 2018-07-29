# uniforms-masked-phone-field

React component for unifroms-material with input mask

## Install

```bash
npm i styleschool/uniforms-masked-phone-field
```

## Example

```jsx
import { MaskedUniformsPhoneField } from 'uniforms-masked-phone-field';
import { AutoForm } from 'uniforms-material';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms/SimpleSchema2Bridge';

const Bridge = new SimpleSchema2Bridge(new SimpleSchema({
  phone: {
    type: String,
    uniforms: {
      component: (props: any) => <MaskedUniformsPhoneField {...props} />,
    },
  },
}));

<AutoForm schema={Bridge} />
```