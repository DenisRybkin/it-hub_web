import React from 'react';
import { IAuthFormProps } from '@components/entities/auth/forms/common/auth-interface';
import { z } from 'zod';
import { RegistrationSchema } from '@lib/utils/validations';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { DialogFooter } from '@components/ui/dialog';
import { Button } from '@components/ui/button';

interface IRegistrationFormProps
  extends IAuthFormProps<z.infer<typeof RegistrationSchema>> {}

export const RegistrationForm = (props: IRegistrationFormProps) => {
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      name: '',
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const handleSubmit = async (fields: z.infer<typeof RegistrationSchema>) =>
    props.onSubmit(fields);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col justify-start gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('ui:label.name')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('ui:placeholder.enter')}
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage number={3} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('ui:label.nickname')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('ui:placeholder.enter')}
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage number={3} />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('ui:label.password_confirm')}</FormLabel>
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
            {t('ui:button.sign_up')}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
