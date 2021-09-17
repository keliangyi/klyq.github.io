import { IBase } from '.'

export interface IPopupProps extends IBase {
	visible?: boolean
	getContainer?: false | string | (() => HTMLElement)
	scroll?: boolean
}
