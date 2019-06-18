import fmtEvent from './fmtEvent';
Component({
  data: {
  },
  props: {
    className: '',
    style:"",
    multiline: false,
    autoFocus:false,
    editable:true,
    keyboardType:"default",
    maxLength:"",
    placeholder:"",
    password:false,
    secureTextEntry:false,
    value:"",
    defaultValue:"",
    onAppear:()=>{},
    onDisAppear:()=>{},
    onBlur:()=>{},
    onFocus:()=>{},
    onChange:()=>{},
    onInput:()=>{}
  },
  didMount() {
  },
  methods: {
    onAppear(e){
      const event = fmtEvent(this.props, e);
      this.props.onAppear(event)
    },
    onDisAppear(e){
      const event = fmtEvent(this.props, e);
      this.props.onDisAppear(event)
    },
    onBlur(e){
      const event = fmtEvent(this.props, e);
      this.props.onBlur(event)
    },
    onFocus(e){
      const event = fmtEvent(this.props, e);
      this.props.onFocus(event)
    },
    onChange(e){
      const event = fmtEvent(this.props, e);
      this.props.onChange(event)
    },
    onInput(e){
      const event = fmtEvent(this.props, e);
      this.props.onInput(event)
    }
  }
});