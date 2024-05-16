import clsx from 'clsx';
import styles from 'src/styles/index.module.scss';
import { CSSProperties, useState, SyntheticEvent } from 'react';

import { Article } from 'components/article/Article';
import { ArticleParamsForm } from 'components/article-params-form/ArticleParamsForm';

import {
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';

export const App = () => {
	const [formState, setFormState] = useState(defaultArticleState);

	const pageStyle = {
		'--font-family': formState.fontFamilyOption.value,
		'--font-size': formState.fontSizeOption.value,
		'--font-color': formState.fontColor.value,
		'--container-width': formState.contentWidth.value,
		'--bg-color': formState.backgroundColor.value,
	};

	const [style, setStyle] = useState(pageStyle);

	const handleResetForm = () => {
		setFormState(defaultArticleState);
		setStyle({
			'--font-family': defaultArticleState.fontFamilyOption.value,
			'--font-size': defaultArticleState.fontSizeOption.value,
			'--font-color': defaultArticleState.fontColor.value,
			'--container-width': defaultArticleState.contentWidth.value,
			'--bg-color': defaultArticleState.backgroundColor.value,
		});
	};

	const handleChange = (type: keyof ArticleStateType, value: OptionType) => {
		setFormState({
			...formState,
			[type]: value,
		});
	};

	return (
		<div className={clsx(styles.main)} style={style as CSSProperties}>
			<ArticleParamsForm
				formState={formState}
				handleChange={handleChange}
				handleResetForm={handleResetForm}
				handleFormSubmit={(e: SyntheticEvent) => {
					e.preventDefault();
					setStyle({ ...pageStyle });
				}}></ArticleParamsForm>
			<Article />
		</div>
	);
};
