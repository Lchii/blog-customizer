import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, SyntheticEvent } from 'react';
import clsx from 'clsx';
import styles from './styles/index.module.scss';
import './styles/index.scss';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { Text } from 'components/text';
import { Select } from './components/select';
import { RadioGroup } from './components/radio-group';
import { Separator } from './components/separator';

import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from './constants/articleProps';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [bgColor, setBgColor] = useState(defaultArticleState.backgroundColor);
	const [containerWidth, setContainerWidth] = useState(
		defaultArticleState.contentWidth
	);

	const pageStyle = {
		'--font-family': fontFamily.value,
		'--font-size': fontSize.value,
		'--font-color': fontColor.value,
		'--container-width': containerWidth.value,
		'--bg-color': bgColor.value,
	};

	const [style, setStyle] = useState(pageStyle);

	const setDefaultOptions = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setContainerWidth(defaultArticleState.contentWidth);
	};

	return (
		<div className={clsx(styles.main)} style={style as CSSProperties}>
			<ArticleParamsForm
				handleResetClick={() => {
					setDefaultOptions();
					setStyle({
						'--font-family': defaultArticleState.fontFamilyOption.value,
						'--font-size': defaultArticleState.fontSizeOption.value,
						'--font-color': defaultArticleState.fontColor.value,
						'--container-width': defaultArticleState.contentWidth.value,
						'--bg-color': defaultArticleState.backgroundColor.value,
					});
				}}
				handleFormSubmit={(e: SyntheticEvent) => {
					e.preventDefault();
					setStyle({ ...pageStyle });
				}}>
				<Text as={'h2'} size={31} weight={800} uppercase={true}>
					Задайте параметры
				</Text>
				<Select
					title='Шрифт'
					selected={fontFamily}
					options={fontFamilyOptions}
					onChange={setFontFamily}
				/>
				<RadioGroup
					title='Размер'
					selected={fontSize}
					options={fontSizeOptions}
					name='fontSize'
					onChange={setFontSize}
				/>
				<Select
					title='Цвет шрифта'
					selected={fontColor}
					options={fontColors}
					onChange={setFontColor}
				/>
				<Separator />
				<Select
					title='Цвет фона'
					selected={bgColor}
					options={backgroundColors}
					onChange={setBgColor}
				/>
				<Select
					title='Ширина контента'
					selected={containerWidth}
					options={contentWidthArr}
					onChange={setContainerWidth}
				/>
			</ArticleParamsForm>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
