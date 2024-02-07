import { CounterHookForm } from '@components/shared/counter/counter-hook-form';
import { Button } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenerateTestSchema } from '@lib/utils/validations';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

interface IGenerateTestFromProps {
  onSubmit: (dto: z.infer<typeof GenerateTestSchema>) => void;
}

export const GenerateTestFrom = (props: IGenerateTestFromProps) => {
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof GenerateTestSchema>>({
    resolver: zodResolver(GenerateTestSchema),
    defaultValues: {
      count: 2,
      topic: '',
    },
  });

  const handleSubmit = (dto: z.infer<typeof GenerateTestSchema>) =>
    props.onSubmit(dto);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col justify-between h-full pb-10 pt-5"
      >
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('ui:label.test_topic')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('ui:placeholder.enter')}
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage number={6} />
            </FormItem>
          )}
        />
        <CounterHookForm<z.infer<typeof GenerateTestSchema>>
          name="count"
          defaultValue={2}
          control={form.control}
          min={1}
          max={5}
        />
        <Button type="submit" variant="primary">
          {t('ui:button.generate')}
        </Button>
      </form>
    </Form>
  );
};
