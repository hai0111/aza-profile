/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'

import { Alignment } from '@ckeditor/ckeditor5-alignment'
import { Autoformat } from '@ckeditor/ckeditor5-autoformat'
import {
	Bold,
	Code,
	Italic,
	Subscript,
	Superscript,
	Underline,
} from '@ckeditor/ckeditor5-basic-styles'
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote'
import { CKBox } from '@ckeditor/ckeditor5-ckbox'
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services'
import { CodeBlock } from '@ckeditor/ckeditor5-code-block'
import type { EditorConfig } from '@ckeditor/ckeditor5-core'
import { Essentials } from '@ckeditor/ckeditor5-essentials'
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace'
import {
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
} from '@ckeditor/ckeditor5-font'
import { Heading } from '@ckeditor/ckeditor5-heading'
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line'
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed'
import {
	Image,
	ImageCaption,
	ImageInsert,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	PictureEditing,
} from '@ckeditor/ckeditor5-image'
import { Indent } from '@ckeditor/ckeditor5-indent'
import { AutoLink, Link, LinkImage } from '@ckeditor/ckeditor5-link'
import { List, TodoList } from '@ckeditor/ckeditor5-list'
import { MediaEmbed, MediaEmbedToolbar } from '@ckeditor/ckeditor5-media-embed'
import { PageBreak } from '@ckeditor/ckeditor5-page-break'
import { Paragraph } from '@ckeditor/ckeditor5-paragraph'
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office'
import {
	Table,
	TableCaption,
	TableCellProperties,
	TableProperties,
	TableToolbar,
} from '@ckeditor/ckeditor5-table'
import { TextTransformation } from '@ckeditor/ckeditor5-typing'
import { Undo } from '@ckeditor/ckeditor5-undo'

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
	public static override builtinPlugins = [
		Alignment,
		AutoLink,
		Autoformat,
		BlockQuote,
		Bold,
		CKBox,
		CloudServices,
		Code,
		CodeBlock,
		Essentials,
		FindAndReplace,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		Heading,
		HorizontalLine,
		HtmlEmbed,
		Image,
		ImageCaption,
		ImageInsert,
		ImageResize,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Indent,
		Italic,
		Link,
		LinkImage,
		List,
		MediaEmbed,
		MediaEmbedToolbar,
		PageBreak,
		Paragraph,
		PasteFromOffice,
		PictureEditing,
		Subscript,
		Superscript,
		Table,
		TableCaption,
		TableCellProperties,
		TableProperties,
		TableToolbar,
		TextTransformation,
		TodoList,
		Underline,
		Undo,
	]

	public static override defaultConfig: EditorConfig = {
		toolbar: {
			items: [
				'undo',
				'redo',
				'|',
				'heading',
				'|',
				'fontFamily',
				'fontSize',
				'|',
				'bold',
				'underline',
				'italic',
				'alignment',
				'|',
				'fontColor',
				'fontBackgroundColor',
				'|',
				'bulletedList',
				'numberedList',
				'todoList',
				'|',
				'superscript',
				'subscript',
				'code',
				'codeBlock',
				'|',
				'link',
				'imageInsert',
				'mediaEmbed',
				'|',
				'blockQuote',
				'htmlEmbed',
				'|',
				'outdent',
				'indent',
				'|',
				'insertTable',
				'horizontalLine',
				'findAndReplace',
				'pageBreak',
			],
		},
		language: 'en',
		image: {
			toolbar: [
				'imageTextAlternative',
				'toggleImageCaption',
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side',
				'linkImage',
			],
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells',
				'tableCellProperties',
				'tableProperties',
			],
		},
	} as any
}

export default Editor
