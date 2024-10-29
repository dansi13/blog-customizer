import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

import { useState, useRef } from 'react';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	articleState: typeof defaultArticleState;
	setArticleState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const [fontFamily, setFontFamily] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);

	const toggleSidebar = () => {
		setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);
	};

	const handleApply = (event: React.FormEvent) => {
		event.preventDefault();
		setArticleState({
			...articleState,
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
	};

	const handleReset = () => {
		setArticleState(defaultArticleState),
			setFontFamily(defaultArticleState.fontFamilyOption),
			setFontSize(defaultArticleState.fontSizeOption),
			setFontColor(defaultArticleState.fontColor),
			setBackgroundColor(defaultArticleState.backgroundColor),
			setContentWidth(defaultArticleState.contentWidth);
	};

	const ref = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: ref,
		onClose: () => setIsSidebarOpen(false),
		onChange: setIsSidebarOpen,
	});

	return (
		<div ref={ref}>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						onChange={setFontFamily}
						title='Шрифт'
					/>
					<RadioGroup
						selected={fontSize}
						options={fontSizeOptions}
						onChange={setFontSize}
						title='Размер шрифта'
						name='fontSize'
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						onChange={setFontColor}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						onChange={setBackgroundColor}
						title='Цвет фона'
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						onChange={setContentWidth}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
