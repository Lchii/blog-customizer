import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { ReactNode, SyntheticEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export type ArticleParamsFormProps = {
	children: ReactNode;
	handleResetClick: () => void;
	handleFormSubmit: (event: SyntheticEvent) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const articleParamsFormStyle = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (!isOpen) return;
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				setIsOpen(false);
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen]);

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
					{props.children}
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={props.handleResetClick}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
