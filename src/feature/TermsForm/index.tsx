import { useState, useMemo } from 'react';
import { Text } from 'react-native';
import TermItem from './TermItem';
import Line from '@/assets/icons/Line';
import { UserInputLayout, Button } from '@/components';
import { COLOR, TEXT_STYLE } from '@/constants/styles';
import { useSignUpStore } from '@/states/signUpStore';

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
  },
  {
    label: '개인정보 처리방침 동의',
    isRequired: true,
  },
  {
    label: '마케팅 정보 수신 동의',
    isRequired: false,
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
          onLabelPress={() => {}}
          prefix={<Prefix isRequired={term.isRequired} />}
        />
      ))}
    </UserInputLayout>
  );
};

export default TermsForm;
