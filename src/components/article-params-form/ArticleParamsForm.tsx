import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import clsx from 'clsx';

import {
	ArticleStateType,
	OptionType,
	StyleType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

export type ArticleParamsFormProps = {
	generateStyle: (articleStyle: ArticleStateType) => StyleType;
	setStyle: React.Dispatch<React.SetStateAction<StyleType>>;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	const articleParamsFormStyle = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

	const handleResetForm = () => {
		setFormState(defaultArticleState);
		props.setStyle(props.generateStyle(defaultArticleState));
	};

	const handleChange = (type: keyof ArticleStateType, value: OptionType) => {
		setFormState({
			...formState,
			[type]: value,
		});
	};

	const handleFormSubmit = (event: SyntheticEvent) => {
		event?.preventDefault();
		props.setStyle(props.generateStyle(formState));
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	return (
		<div ref={rootRef}>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen((isOpen) => !isOpen);
				}}
			/>
			<aside className={articleParamsFormStyle}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => {
							handleChange('fontFamilyOption', option);
						}}
					/>
					<RadioGroup
						title='Размер'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						name='fontSize'
						onChange={(option) => {
							handleChange('fontSizeOption', option);
						}}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) => {
							handleChange('fontColor', option);
						}}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => {
							handleChange('backgroundColor', option);
						}}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => {
							handleChange('contentWidth', option);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
