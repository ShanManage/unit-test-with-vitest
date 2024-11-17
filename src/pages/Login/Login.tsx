/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  Flex,
  Form,
  Input,
  Space,
  Typography,
  Image,
  Alert,
} from "antd"
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { LoginFormFields } from "../../interfaces";
import styles from './Login.module.scss';
import logo from '../../assets/logo.svg'
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../utils/constants";
import { useState } from "react";
import { AuthService } from "../../services/auth";
import { CustomButton } from "../../components";

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onFinish = async(values: LoginFormFields) => {
      try {
        await AuthService.login(values);
        setErrorMessage(null);
        navigate(APP_ROUTES.DASHBOARD);
      } catch (error) {
        console.error("Login failed", error);
        setErrorMessage("Invalid email or password.!");
      }
    }
  return (
    <Flex justify="center">
      <Card styles={{ body: { padding: '30px 60px' } }}>
        <Flex justify="center">
          <Image
            width={150}
            src={logo}
            preview={false}
            alt="logo"
          />
        </Flex>
        <Flex justify="center"><Title level={3} style={{ margin: '0px' }}>Vitest Environment</Title></Flex><br />
        <Flex justify="center"><Text disabled>Login to your account</Text></Flex><br /><br />

        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            style={{ marginBottom: 20 }}
          />
        )}

        <Form onFinish={onFinish}>
          <Space direction="vertical" className="full-width">
            <Form.Item<LoginFormFields>
              name="username"
              rules={[
                { required: true, message: 'Please enter your Email!' },
                { type: 'email', message: 'Please enter valid Email!' },
              ]}
            >
              <Input
                size='large'
                prefix={<MailOutlined className={styles.prefix} />}
                placeholder='Email Address'
              />
            </Form.Item>
            <Form.Item<LoginFormFields>
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password
                size='large'
                prefix={<LockOutlined className={styles.prefix} />}
                placeholder='Password'
                data-testid="password-field"
              />
            </Form.Item>

            <Form.Item>
              <CustomButton
                type="primary"
                size='large'
                htmlType="submit"
                className='full-width'
                // loading={isAuthorizing || isUserFetching}
              >
                Login
              </CustomButton>
            </Form.Item>

          </Space>
        </Form>
      </Card>
    </Flex>
  )
}

export default Login
