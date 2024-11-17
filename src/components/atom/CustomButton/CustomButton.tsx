import { Button, ButtonProps } from 'antd';

const CustomButton = ({ ...props }: ButtonProps) => {
  return <Button {...props} />;
};

export default CustomButton;
