import { forwardRef, useRef, useImperativeHandle, useEffect, createElement } from 'rax';
import { isWeex } from 'universal-env';
import styles from './index.css';

const typeMap = {
  'default': 'text',
  'ascii-capable': 'text',
  'numbers-and-punctuation': 'number',
  'url': 'url',
  'number-pad': 'number',
  'phone-pad': 'tel',
  'name-phone-pad': 'text',
  'email-address': 'email',
  'decimal-pad': 'number',
  'twitter': 'text',
  'web-search': 'search',
  'numeric': 'number'
};

function getText(event) {
  let text;
  if (isWeex) {
    text = event.value;
  } else {
    text = event.target.value;
  }
  return text;
}

function genEventObject(originalEvent) {
  let text = getText(originalEvent);
  return {
    nativeEvent: {
      text
    },
    originalEvent,
    value: text,
    target: originalEvent.target,
  };
}

function TextInput(props, ref) {
  const refEl = useRef(null);

  function setValue(value = '') {
    if (isWeex) {
      refEl.current.setAttr('value', value, false); // weex api.
    } else {
      refEl.current.setAttribute('value', value);
    }
  }

  useEffect(() => {
    setValue(props.value);
  });

  const {
    accessibilityLabel,
    autoComplete,
    editable,
    keyboardType,
    maxNumberOfLines,
    maxLength,
    maxlength,
    multiline,
    numberOfLines,
    onBlur,
    onFocus,
    onChange,
    onChangeText,
    onInput,
    password,
    secureTextEntry,
    style,
    value,
    defaultValue,
  } = props;

  const handleInput = (event) => {
    onInput(genEventObject(event));
  };

  const handleChange = (event) => {
    if (onChange) onChange(genEventObject(event));
    if (onChangeText) onChangeText(getText(event));
  };

  const handleFocus = (event) => {
    onFocus(genEventObject(event));
  };

  const handleBlur = (event) => {
    onBlur(genEventObject(event));
  };

  const focus = () => {
    refEl.current.focus();
  };

  const blur = () => {
    refEl.current.blur();
  };

  const clear = () => {
    setValue('');
  };

  useImperativeHandle(ref, () => ({ focus, blur, clear }));

  let propsCommon = {
    ...props,
    'aria-label': accessibilityLabel,
    autoComplete: autoComplete && 'on',
    maxlength: maxlength || maxLength,
    onChange: (onChange || onChangeText) && handleChange,
    onInput: onInput && handleInput,
    onBlur: onBlur && handleBlur,
    onFocus: onFocus && handleFocus,
    style: { ...styles.initial, ...style },
    ref: refEl,
  };

  if (value) {
    delete propsCommon.defaultValue;
  } else {
    propsCommon.value = defaultValue;
  }

  if (typeof editable !== 'undefined' && !editable) {
    propsCommon.readOnly = true;
  }

  let type = typeMap[keyboardType];
  if (password || secureTextEntry) {
    type = 'password';
  }

  if (isWeex) {
    // Diff with web readonly attr, `disabled` must be boolean value
    let disabled = Boolean(propsCommon.readOnly);

    if (multiline) {
      return <textarea {...propsCommon} rows={20} disabled={disabled} />;
    } else {
      // https://github.com/alibaba/weex/blob/dev/doc/components/input.md
      return <input {...propsCommon} type={type} disabled={disabled} />;
    }
  } else {
    let input;
    if (multiline) {
      const propsMultiline = {
        maxRows: maxNumberOfLines || numberOfLines,
        minRows: numberOfLines
      };

      input = <textarea {...propsCommon} {...propsMultiline} >{propsCommon.value}</textarea>;
    } else {
      input = <input {...propsCommon} type={type} />;
    }

    return input;
  }
}

export default forwardRef(TextInput);
