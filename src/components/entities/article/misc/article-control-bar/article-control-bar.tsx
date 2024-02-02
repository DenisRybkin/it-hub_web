import { AuthContext } from '@app/providers/auth';
import type { UpdateDto } from '@components/pages/article';
import { CoverImage } from '@components/shared/cover-image';
import { ConfirmDialog } from '@components/shared/dialog';
import { Button } from '@components/ui/button';
import { Article } from '@lib/api/models';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FiEdit3, FiImage, FiSave, FiTrash2, FiX } from 'react-icons/fi';

interface IArticleControlBarProps {
  isEditMode?: boolean;
  updateDto?: UpdateDto;
  onUpdate?: () => Promise<unknown>;
  isUpdating: boolean;
  onOffEditMode: () => void;
  onTurnOnEditMode: () => void;
  data: Article;
  onResetPreview: () => void;
  onOpenSelectPreviewDialog: () => void;
  onDeleteArticle: () => void;
  isDeleting: boolean;
}

export const ArticleControlBar = (props: IArticleControlBarProps) => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  return (
    <>
      {(props.isEditMode ? props.updateDto?.preview : props.data?.preview) && (
        <CoverImage
          image={
            props.isEditMode
              ? props.updateDto?.preview
              : props.data?.preview?.staticField
          }
          bottomPanel={
            props.isEditMode && (
              <div className="flex items-center gap-x-2">
                <Button
                  onClick={props.onOpenSelectPreviewDialog}
                  variant="ghost"
                  data={{ leftIcon: <FiImage /> }}
                >
                  {t('ui:button.change_cover')}
                </Button>
                <Button
                  onClick={props.onResetPreview}
                  variant="ghost"
                  data={{ leftIcon: <FiX /> }}
                >
                  {t('ui:button.remove')}
                </Button>
              </div>
            )
          }
        />
      )}
      <div className="flex items-center justify-between">
        <h1 className="head-text text-left">
          {t('ui:title.article', { id: props.data.id })}
        </h1>
        {authContext.user?.id == props.data.createdByUserId && (
          <div className="flex flex-row items-center gap-1">
            {props.isEditMode ? (
              <>
                <Button
                  onClick={props.onUpdate}
                  variant="ghost"
                  size="icon"
                  data={{ isLoading: props.isUpdating }}
                >
                  <FiSave size={20} />
                </Button>
                {!props.updateDto?.preview && (
                  <Button
                    onClick={props.onOpenSelectPreviewDialog}
                    variant="ghost"
                    size="icon"
                  >
                    <FiImage size={20} />
                  </Button>
                )}
                <Button
                  onClick={props.onOffEditMode}
                  variant="ghost"
                  size="icon"
                >
                  <FiX size={20} />
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={props.onTurnOnEditMode}
                  variant="ghost"
                  size="icon"
                >
                  <FiEdit3 size={20} />
                </Button>
                <ConfirmDialog
                  trigger={
                    <Button variant="ghost" size="icon">
                      <FiTrash2 size={20} className="stroke-red" />
                    </Button>
                  }
                  title={t('ui:title.want_delete_article')}
                  confirmIsLoading={props.isDeleting}
                  onConfirm={props.onDeleteArticle}
                />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
