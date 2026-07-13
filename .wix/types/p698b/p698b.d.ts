/// <reference path="../masterPage/masterPage.d.ts" />
type PageElementsMap = MasterPageElementsMap & {
	"#lightbox1": $w.HiddenCollapsedElement;
	"#sideCart1": $w.IFrame;
	"#sideCartLightboxController1": $w.AppController;
	"#page1": $w.Page;
}