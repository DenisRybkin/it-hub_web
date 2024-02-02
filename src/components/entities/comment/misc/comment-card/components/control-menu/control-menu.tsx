import { AuthContext } from '@app/providers/auth';
import { ConfirmDialog } from '@components/shared/dialog';
import { Button } from '@components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@components/ui/dropdown-menu';
import { toast } from '@components/ui/use-toast';
import { User } from '@lib/api/models';
import { api } from '@lib/api/plugins';
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMoreHorizontal } from 'react-icons/fi';

interface IControlMenuProps {
  commentId: number;
  onSuccess?: (commentId: number) => void;
  author?: User;
}

export const ControlMenu = (props: IControlMenuProps) => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const confirmDialogTriggerRef = useRef<HTMLDivElement | null>(null);

  const handleError = () =>
    toast({ title: t('toast:error.default'), variant: 'destructive' });

  const handleSuccess = () => props.onSuccess?.(props.commentId);

  const handleOpenConfirmLogoutDialog = () =>
    void setIsOpenMenu(false) || confirmDialogTriggerRef.current?.click();

  const handleDeleteComment = async () => {
    setIsLoading(true);
    await api.articleComment.delete(
      props.commentId,
      handleSuccess,
      handleError
    );
    setIsLoading(false);
  };

  return props.author?.id != null &&
    props.author?.id == authContext.user?.id ? (
    <>
      <ConfirmDialog
        trigger={<div className="hidden" ref={confirmDialogTriggerRef} />}
        title={t('ui:title.want_logout')}
        onConfirm={handleDeleteComment}
        confirmIsLoading={isLoading}
      />
      <DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <FiMoreHorizontal size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="md:w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem>{t('ui:button.edit')}</DropdownMenuItem>
            <DropdownMenuItem onClick={handleOpenConfirmLogoutDialog}>
              {t('ui:button.delete')}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  ) : null;
};
