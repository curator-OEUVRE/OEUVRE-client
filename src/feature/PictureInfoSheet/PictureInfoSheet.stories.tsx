import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import PictureInfoSheet from '.';

storiesOf('PictureInfoSheet', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <PictureInfoSheet
      title="강아지입니다열다섯글자쯤입니다"
      userId="yuda1124"
      manufactureYear="2022"
      material="캠퍼스에 유채"
      scale="22*88(cm)"
      description="어떻게하면오십글자가될수있는지한번또쳐보겠습니다이렇게저렇게하다보면오십글자가또되겠죠좀적은거같기도"
    />
  ));
