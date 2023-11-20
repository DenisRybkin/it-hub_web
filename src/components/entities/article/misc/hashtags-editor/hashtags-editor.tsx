import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useImperativeHandle,
  useState,
} from 'react';
import { Button } from '@components/ui/button';
import { useTranslation } from 'react-i18next';
import { Combobox, ComboboxItem } from '@components/ui/сombobox';
import { api } from '@lib/api/plugins';
import { Hashtag, ReadHashtagFilterDto } from '@lib/api/models';
import {
  useControllableState,
  useDebounce,
  useInfinityPaging,
} from '@lib/utils/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@components/ui/use-toast';
import { VisibleTrigger } from '@components/shared/visible-trigger/visible-trigger';

export interface IHashtagsEditorForwardRef {
  data?: Hashtag[];
}

type BaseHashtagsEditorProps = { className?: string };

type HashtagsEditorProps = BaseHashtagsEditorProps &
  (
    | {
        readonly: true;
        value: Hashtag[];
        onChange: undefined;
      }
    | {
        value?: Hashtag[];
        onChange?: Dispatch<SetStateAction<Hashtag[] | undefined>>;
      }
  );

export const HashtagsEditor = forwardRef<
  IHashtagsEditorForwardRef,
  HashtagsEditorProps
>((props, ref) => {
  const { t } = useTranslation();

  const handleError = () => t('toast:error.default');
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [selectedHashtags, setSelectedHashtags] = useControllableState<
    Hashtag[] | undefined
  >({
    defaultValue: undefined,
    value: props.value,
    onChange: props.onChange,
  });
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const debouncedSearch = useDebounce<string>(search);
  const { items, isFetching, info, loadNext } = useInfinityPaging<
    Hashtag,
    ReadHashtagFilterDto
  >(
    api.hashtag,
    handleError,
    [{ key: 'name', type: 'like', value: debouncedSearch }],
    undefined,
    isOpenPopup
  );

  const handleSuccess = async (hashtag: Hashtag) => {
    toast({
      variant: 'success',
      title: t('toast:success.hashtag_created'),
    });
    setIsLoading(true);
    await queryClient.invalidateQueries([api.hashtag.toString()]);
    setSelectedHashtags(prev => (prev ? [...prev, hashtag] : [hashtag]));
    setSearch('');
    setIsLoading(false);
  };

  const handleCreateHashTags = async (hashtagName: string) => {
    setIsLoading(true);
    await api.hashtag.create({ name: hashtagName }, handleSuccess, handleError);
    setIsLoading(false);
  };

  const EmptyState = (input: string) => (
    <div className="flex flex-col items-center gap-2">
      <h3 className="break-normal max-w-[300px]">
        {t('text:nothing_found_hashtags', { hashtag: input })}
      </h3>
      <Button
        onClick={() => handleCreateHashTags(input)}
        variant="primary"
        className="w-min"
      >
        {t('ui:button.add')}
      </Button>
    </div>
  );

  useImperativeHandle<IHashtagsEditorForwardRef, IHashtagsEditorForwardRef>(
    ref,
    () => ({ data: selectedHashtags }),
    [selectedHashtags]
  );

  return (
    <Combobox<Hashtag>
      placeholder={t('ui:placeholder.select_hashtag')}
      emptyState={EmptyState}
      open={isOpenPopup}
      onOpenChange={setIsOpenPopup}
      value={selectedHashtags}
      onValueChange={setSelectedHashtags}
      search={search}
      onSearchChange={setSearch}
      isLoading={isFetching || isLoading || search != debouncedSearch}
      getDisplayNameByValue={hashtag => hashtag.name}
      shouldFilter={false}
      getComparableValue={hashtag => hashtag.id}
      multiple
    >
      {items?.map(hashtag => (
        <ComboboxItem<Hashtag> key={hashtag.id} value={hashtag}>
          {hashtag.name}
        </ComboboxItem>
      ))}
      <VisibleTrigger
        onVisible={loadNext}
        disabled={isFetching || !items.length || search != debouncedSearch}
        hidden={info.isDone}
      />
    </Combobox>
  );
});
