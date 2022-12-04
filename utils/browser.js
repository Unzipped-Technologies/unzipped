import {UserUtils} from './';

class BrowserUtil {
    _gTag() {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'UA-162978252-1');
    }

    get_browser() {
        var ua = navigator.userAgent,
            tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return {name: 'IE', version: tem[1] || ''};
        }

        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR|Edge\/(\d+)/);
            if (tem != null) {
                return {name: 'Opera', version: tem[1]};
            }
        }

        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
            M.splice(1, 1, tem[1]);
        }

        return {
            name: M[0],
            version: M[1],
        };
    }

    checkEnvelopNameExists() {
        var url = window.location.href;
        var envelopeId = url.indexOf('envelope_id=');
        return envelopeId;
    }

    getAdminUrlName() {
        var url = window.location.href;
        var name = url.split('adminDashboard/');
        return name[1];
    }

    getEnvelopeIdForCapitalCommitment() {
        var url = window.location.href;
        var parts = url.split('capitalCommitmentPdf/');
        var urlSplitFundId = parts[1].split('/');
        var envelopId = urlSplitFundId[0];
        return envelopId;
    }

    getEnvelopeIdForSideLetter() {
        var url = window.location.href;
        var parts = url.split('sideLetterPdf/');
        var urlSplitFundId = parts[1].split('/');
        var envelopId = urlSplitFundId[0];
        return envelopId;
    }

    getType() {
        var url = window.location.href;
        var parts = url.split('type=');
        var urlSplitFundId = parts[parts.length - 1];
        var type = urlSplitFundId.split('?')[0];
        if (type.indexOf('id=') !== -1) {
            return type.split('&id=')[0];
        } else {
            return type;
        }
    }

    getAlertId() {
        var url = window.location.href;
        var parts = url.split('&id=');
        var id = parts[parts.length - 1];
        return id;
    }

    getCurrentPageForLP() {
        var url = window.location.href;
        var parts = url.split('/');
        var page = parts[5];
        // This checks if the URL has a query in it - i.e: /signDocuments?sId=XXXXX
        page.includes('?') ? ([page] = page.split('?')) : page;
        return page;
    }

    getCurrentPageForGP(pages) {
        const url = window.location.href;
        for (const page of pages) {
            if (url.includes(page)) {
                return page;
            }
        }
    }

    getCurrentPageForSyndication() {
        var url = window.location.href;
        var parts = url.split('/');
        var page = parts[parts.length - 1];
        if (page === '') {
            page = parts[parts.length - 2];
        }
        return page;
    }

    _getBrowserInfo() {
        return window.navigator.appVersion;
    }

    getFirmId() {
        const firmId = UserUtils.getItem('firmId');
        return firmId ? parseInt(firmId) : null;
    }

    getAdminToken() {
        const token = JSON.parse(UserUtils.getItem('adminToken'));
        return token ? token : null;
    }

    _openDoc(url) {
        if (url.indexOf('token=') === -1) {
            this.getToken().then(token => {
                window.open(`${url}?token=${token}`, '_blank').focus();
            });
        } else {
            window.open(url, '_blank').focus();
        }
    }

    _openNewTab(url, target = '_blank', appendToken = true) {
        if (url.indexOf('token=') === -1 && appendToken) {
            this.getToken().then(token => {
                window.open(`${url}?token=${token}`, target);
            });
        } else {
            window.open(url, target);
        }
    }

    _ClearLocalStorage(proceed) {
        UserUtils.clearLocalStorage();
        if (!proceed) {
            window.location.href = '/';
        }
    }

    _isIEEdge() {
        return /Edge\/\d./i.test(navigator.userAgent);
    }

    _isW9Form(type) {
        var url = window.location.href;
        if (type === 'investor') {
            return url.includes('Investor/W9form');
        } else {
            return url.includes('lp/W9form');
        }
    }

    isCapsLockEnabledCheck(event) {
        return typeof event !== 'undefined' && event.getModifierState && event.getModifierState('CapsLock')
            ? true
            : false;
    }

    spaceRestriction(event) {
        var k = event ? event.which : window.event.keyCode;
        if (parseInt(k) === 32) {
            event.preventDefault();
        }
    }

    decodeUrl() {
        const decodeUrl = decodeURI(window.location.search)
            .replace('?', '')
            .split('&')
            .map(param => param.split('='))
            .reduce((values, [key, value]) => {
                values[key] = value;
                return values;
            }, {});
        return decodeUrl ? decodeUrl : null;
    }

    async downloadFile(url, fileName) {
        const token = await this.getToken();
        const blob = await fetch(`${url}?token=${token}`).then(r => r.blob());
        const hiddenElement = document.createElement('a');
        const windowObjUrl = window.URL.createObjectURL(blob);
        hiddenElement.href = windowObjUrl;
        hiddenElement.target = '_self';
        hiddenElement.download = fileName;
        hiddenElement.click();
        window.URL.revokeObjectURL(windowObjUrl);
    }

    convertToRelativePath(url) {
        if (!url) {
            return;
        } else {
            return url
                .split('/')
                .splice('3')
                .join('/')
                .split('?')[0]
                .replace(/\/(\d*)$/, '');
        }
    }

    scrollToTop() {
        const mainContentSimpleBar = document.querySelector('div.simplebar-content-wrapper main');
        const simpleBarContentWrapper = mainContentSimpleBar.closest('div.simplebar-content-wrapper');
        simpleBarContentWrapper?.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
    }

    _openEmail(url) {
        window.open(url, '_blank');
    }

    createUrlFromPath(path) {
        try {
            return new URL(path, window.location.origin);
        } catch (e) {
            return null;
        }
    }

    findUrlSearchParameter(url, param) {
        try {
            if (!(url instanceof URL)) {
                url = new URL(url);
            }
            return new URLSearchParams(url.search).get(param);
        } catch (e) {
            return null;
        }
    }

    removeQueryParametersFromUrl(url) {
        return url?.split(/[?#]/)[0];
    }

    saveRedirectPathToSessionStorage(url) {
        sessionStorage.setItem('redirectTo', url);
    }

    getRedirectPathFromSessionStorage() {
        return sessionStorage.getItem('redirectTo');
    }
}

export default new BrowserUtil();
