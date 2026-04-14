import * as React from 'react';
import type { Editor } from '@tiptap/core';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { cn } from '../../lib/cn';
import type { BaseInputProps } from './types';

export interface InputRichTextProps extends BaseInputProps {
  value?: string;
  onChange?: (value: string) => void;
  /** Show formatting toolbar (bold, italic, lists). @default true */
  toolbar?: boolean;
  /** Minimum height class for the editable area. @default min-h-[140px] */
  editorMinHeightClassName?: string;
}

const editorShellClass = cn(
  'rounded-md border border-input bg-background text-sm ring-offset-background',
  'focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
);

/** TipTap Placeholder extension uses node decorations + data-placeholder; these utilities mirror the usual TipTap CSS. */
const editorContentClass = cn(
  'max-w-none px-3 py-2 text-sm text-foreground',
  '[&_.ProseMirror]:min-h-[inherit] [&_.ProseMirror]:outline-none',
  '[&_.ProseMirror_p]:my-1 [&_.ProseMirror_h2]:mt-2 [&_.ProseMirror_h2]:text-base [&_.ProseMirror_h2]:font-semibold',
  '[&_.ProseMirror_h3]:mt-2 [&_.ProseMirror_h3]:text-sm [&_.ProseMirror_h3]:font-semibold',
  '[&_.ProseMirror_ul]:my-1 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6',
  '[&_.ProseMirror_ol]:my-1 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6',
  '[&_.ProseMirror_p.is-empty]:relative',
  '[&_.ProseMirror_p.is-empty]:before:pointer-events-none [&_.ProseMirror_p.is-empty]:before:absolute [&_.ProseMirror_p.is-empty]:before:left-0 [&_.ProseMirror_p.is-empty]:before:top-0',
  '[&_.ProseMirror_p.is-empty]:before:text-muted-foreground [&_.ProseMirror_p.is-empty]:before:content-[attr(data-placeholder)]',
);

const toolbarButtonClass = cn(
  'inline-flex h-8 items-center justify-center rounded-md px-2 text-xs font-medium',
  'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
  'disabled:pointer-events-none disabled:opacity-50',
);

function RichTextToolbar({ editor }: { editor: Editor }) {
  return (
    <div
      className="flex flex-wrap gap-1 border-b border-input bg-muted/30 px-2 py-1.5"
      role="toolbar"
      aria-label="Formatação"
    >
      <button
        type="button"
        className={toolbarButtonClass}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().toggleBold()}
        aria-pressed={editor.isActive('bold')}
      >
        Negrito
      </button>
      <button
        type="button"
        className={toolbarButtonClass}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().toggleItalic()}
        aria-pressed={editor.isActive('italic')}
      >
        Itálico
      </button>
      <button
        type="button"
        className={toolbarButtonClass}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().toggleBulletList()}
        aria-pressed={editor.isActive('bulletList')}
      >
        Lista
      </button>
      <button
        type="button"
        className={toolbarButtonClass}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().toggleOrderedList()}
        aria-pressed={editor.isActive('orderedList')}
      >
        Numerada
      </button>
    </div>
  );
}

export const InputRichText = React.forwardRef<HTMLDivElement, InputRichTextProps>(
  (
    {
      name,
      label,
      placeholder,
      helperText,
      error,
      disabled,
      required,
      className,
      value,
      onChange,
      toolbar = true,
      editorMinHeightClassName = 'min-h-[140px]',
    },
    ref,
  ) => {
    const lastEmitted = React.useRef<string | undefined>(undefined);

    const editor = useEditor(
      {
        immediatelyRender: false,
        extensions: [
          StarterKit.configure({
            heading: { levels: [2, 3] },
          }),
          Placeholder.configure({
            placeholder: placeholder ?? '',
            emptyEditorClass: 'is-editor-empty',
          }),
        ],
        content: value ?? '<p></p>',
        editable: !disabled,
        editorProps: {
          attributes: {
            'data-slot': 'rich-text-editor',
            class: cn(editorContentClass, editorMinHeightClassName),
          },
        },
        onUpdate: ({ editor: ed }) => {
          const html = ed.getHTML();
          if (lastEmitted.current === html) return;
          lastEmitted.current = html;
          onChange?.(html);
        },
      },
      [disabled, placeholder, editorMinHeightClassName],
    );

    React.useEffect(() => {
      if (!editor || value === undefined) return;
      const current = editor.getHTML();
      if (current === value) return;
      editor.commands.setContent(value, { emitUpdate: false });
      lastEmitted.current = value;
    }, [editor, value]);

    React.useEffect(() => {
      if (!editor) return;
      editor.setEditable(!disabled);
    }, [editor, disabled]);

    return (
      <div ref={ref} className={cn('space-y-2', className)}>
        {label && (
          <label
            htmlFor={name}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </label>
        )}
        <div
          id={name}
          className={cn(editorShellClass, error && 'border-destructive focus-within:ring-destructive')}
          aria-invalid={error ? true : undefined}
          aria-describedby={helperText && !error ? `${name}-description` : undefined}
          aria-errormessage={error ? `${name}-error` : undefined}
        >
          {!editor ? (
            <div
              className={cn('animate-pulse rounded-md bg-muted/40', editorMinHeightClassName)}
              aria-hidden
            />
          ) : (
            <>
              {toolbar && !disabled && <RichTextToolbar editor={editor} />}
              <EditorContent editor={editor} />
            </>
          )}
        </div>
        {helperText && !error && (
          <p id={`${name}-description`} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
        {error && (
          <p id={`${name}-error`} className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

InputRichText.displayName = 'InputRichText';
