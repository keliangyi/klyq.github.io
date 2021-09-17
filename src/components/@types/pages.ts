import { IBase } from '.'

export interface IPageProps extends Omit<IBase, 'title'> {
	title?: React.ReactNode
}
