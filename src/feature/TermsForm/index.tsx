import { useState, useMemo } from 'react';
import { Text, StyleSheet, Linking } from 'react-native';
import TermItem from './TermItem';
import Line from '@/assets/icons/Line';
import { UserInputLayout, Button } from '@/components';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import { styles } from '@/screens/FloorScreen/EditDescriptionScreen';
import { useSignUpStore } from '@/states/signUpStore';

const extraStyles = StyleSheet.create({
  padding: {
    paddingHorizontal: 20,
  },
});

const Prefix = ({ isRequired }: { isRequired: boolean }) => (
  <Text
    style={[
      TEXT_STYLE.button16M,
      {
        color: isRequired ? COLOR.system.blue : COLOR.mono.gray3,
      },
    ]}
  >
    {isRequired ? '(필수) ' : '(선택) '}
  </Text>
);

const TERMS = [
  {
    label: '서비스 이용약관 동의',
    isRequired: true,
    onPress: () => {
      Linking.openURL(
        'https://makeus-challenge.notion.site/9dfb41a1e9284a6cae315db1cf7d9c5b',
      );
    },
  },
  {
    label: '개인정보 처리방침 동의',
    isRequired: true,
    onPress: () => {
      Linking.openURL(
        'https://makeus-challenge.notion.site/c97ed10160a74e9d87dcfadb01fea89b',
      );
    },
  },
  {
    label: '마케팅 정보 수신 동의',
    isRequired: false,
    onPress: () => {
      Linking.openURL(
        'https://makeus-challenge.notion.site/c97ed10160a74e9d87dcfadb01fea89b',
      );
    },
  },
];

interface Props {
  onNextPress?: () => void;
}

const TermsForm = ({ onNextPress }: Props) => {
  const { setIsMarketingAgreed } = useSignUpStore();

  const [checked, setChecked] = useState([false, false, false]);

  const toggleChecked = (index: number) => {
    setChecked((prev) => {
      const newChecked = [...prev];
      newChecked[index] = !newChecked[index];

      return newChecked;
    });
  };

  const isAllChecked = useMemo(() => {
    let result = true;

    checked.forEach((isChecked) => {
      if (!isChecked) {
        result = false;
      }
    });

    return result;
  }, [checked]);

  const canGoNext = useMemo(() => {
    let result = true;

    checked.forEach((isChecked, index) => {
      if (TERMS[index].isRequired && !isChecked) {
        result = false;
      }
    });

    return result;
  }, [checked]);

  const button = (
    <Button
      backgroundColor={COLOR.mono.gray7}
      onPress={() => {
        setIsMarketingAgreed(checked[2]);
        onNextPress?.();
      }}
      disabled={!canGoNext}
    >
      <Text style={[TEXT_STYLE.button16M, { color: COLOR.mono.white }]}>
        다음으로
      </Text>
    </Button>
  );

  return (
    <UserInputLayout
      infoMessage="가입약관을 확인해 주세요"
      gap={8}
      button={button}
      style={extraStyles.padding}
    >
      <TermItem
        label="약관 전체 동의"
        isChecked={isAllChecked}
        onCheckboxPress={() => {
          setChecked((prev) => prev.map(() => !isAllChecked));
        }}
        isBold
      />
      <Line />
      {TERMS.map((term, index) => (
        <TermItem
          key={term.label}
          label={term.label}
          isChecked={checked[index]}
          onCheckboxPress={() => toggleChecked(index)}
          onLabelPress={term.onPress}
          prefix={<Prefix isRequired={term.isRequired} />}
        />
      ))}
    </UserInputLayout>
  );
};

export default TermsForm;
