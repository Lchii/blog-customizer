import clsx from 'clsx';
import styles from 'src/styles/index.module.scss';
import { CSSProperties, useState } from 'react';

import { Article } from 'components/article/Article';
import { ArticleParamsForm } from 'components/article-params-form/ArticleParamsForm';

import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

export const App = () => {
	const generateStyle = (articalState: ArticleStateType) => {
		return {
			'--font-family': articalState.fontFamilyOption.value,
			'--font-size': articalState.fontSizeOption.value,
			'--font-color': articalState.fontColor.value,
			'--container-width': articalState.contentWidth.value,
			'--bg-color': articalState.backgroundColor.value,
		};
	};

	const pageStyle = generateStyle(defaultArticleState);

	const [style, setStyle] = useState(pageStyle);

	return (
		<div className={clsx(styles.main)} style={style as CSSProperties}>
			<ArticleParamsForm generateStyle={generateStyle} setStyle={setStyle} />
			<Article />
		</div>
	);
};
