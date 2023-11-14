import { useState } from 'react';
import { Button } from '@components/ui/button';
import { useTranslation } from 'react-i18next';
import { Combobox, ComboboxItem } from '@components/ui/сombobox';
import { api } from '@lib/api/plugins';
import { Hashtag, ReadHashtagFilterDto } from '@lib/api/models';
import { useDebounce, useScrollPaging } from '@lib/utils/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@components/ui/use-toast';
import { VisibleTrigger } from '@components/shared/visible-trigger/visible-trigger';

export const HashtagsEditor = () => {
  const { t } = useTranslation();

  const handleError = () => t('toast:error.default');
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [selectedHashtagIds, setSelectedHashtagIds] = useState<number[] | null>(
    null
  );
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const debouncedSearch = useDebounce<string>(search);
  const { items, isFetching, info, loadNext } = useScrollPaging<
    Hashtag,
    ReadHashtagFilterDto
  >(
    api.hashtag,
    undefined,
    handleError,
    [{ key: 'name', type: 'like', value: debouncedSearch }],
    undefined,
    isOpenPopup
  );
  const { items: staticItems } = useScrollPaging<Hashtag, ReadHashtagFilterDto>(
    api.hashtag,
    undefined,
    handleError,
    [{ key: 'name', type: 'like', value: '' }],
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
    setSelectedHashtagIds(prev =>
      prev ? [...prev, hashtag.id] : [hashtag.id]
    );
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

  return (
    <Combobox<number>
      placeholder={t('ui:placeholder.select_hashtag')}
      emptyState={EmptyState}
      open={isOpenPopup}
      onOpenChange={setIsOpenPopup}
      value={selectedHashtagIds}
      onValueChange={setSelectedHashtagIds}
      search={search}
      onSearchChange={setSearch}
      isLoading={isFetching || isLoading || search != debouncedSearch}
      getDisplayNameByValue={id =>
        staticItems.find(item => item.id == id)?.name ?? ''
      }
      shouldFilter={false}
      multiple
    >
      {items.map(hashtag => (
        <ComboboxItem key={hashtag.id} value={hashtag.id}>
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
};
