import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoginSchema } from '@lib/utils/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { IAuthFormProps } from '@components/entities/auth/forms/common/auth-interface';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { useTranslation } from 'react-i18next';
import { Input } from '@components/ui/input';
import { DialogFooter } from '@components/ui/dialog';
import { Button } from '@components/ui/button';

interface ILoginFormProps extends IAuthFormProps<z.infer<typeof LoginSchema>> {}

export const LoginForm = (props: ILoginFormProps) => {
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (fields: z.infer<typeof LoginSchema>) =>
    props.onSubmit(fields);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col justify-start gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('ui:label.email')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('ui:placeholder.enter')}
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage number={6} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('ui:label.password')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('ui:placeholder.enter')}
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage number={6} />
            </FormItem>
          )}
        />
        {props.extraFromContent}
        <DialogFooter>
          <Button
            data={{ isLoading: props.isLoading }}
            className="mt-5"
            variant="primary"
            type="submit"
          >
            {t('ui:button.sign_in')}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
