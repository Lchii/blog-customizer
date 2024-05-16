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
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

export type ArticleParamsFormProps = {
	formState: {
		fontFamilyOption: OptionType;
		fontColor: OptionType;
		backgroundColor: OptionType;
		contentWidth: OptionType;
		fontSizeOption: OptionType;
	};
	handleChange: (type: keyof ArticleStateType, value: OptionType) => void;
	handleResetForm: () => void;
	handleFormSubmit: (event: SyntheticEvent) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const articleParamsFormStyle = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

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
				<form className={styles.form} onSubmit={props.handleFormSubmit}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={props.formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => {
							props.handleChange('fontFamilyOption', option);
						}}
					/>
					<RadioGroup
						title='Размер'
						selected={props.formState.fontSizeOption}
						options={fontSizeOptions}
						name='fontSize'
						onChange={(option) => {
							props.handleChange('fontSizeOption', option);
						}}
					/>
					<Select
						title='Цвет шрифта'
						selected={props.formState.fontColor}
						options={fontColors}
						onChange={(option) => {
							props.handleChange('fontColor', option);
						}}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={props.formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => {
							props.handleChange('backgroundColor', option);
						}}
					/>
					<Select
						title='Ширина контента'
						selected={props.formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => {
							props.handleChange('contentWidth', option);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={props.handleResetForm}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
