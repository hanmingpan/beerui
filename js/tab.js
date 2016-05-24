/*!
 * tab切换
 * author: @xiaopan
 * Licensed under the MIT license
 */
;(function ($, window, document, undefined) {

    function Tab (element, options) {
        var _ = this;

        _.defaults = {
            trigger : 'click',
            activeClass: 'active',
            index: 0,
            navWrap: '.tab-nav',
            contWrap: '.tab-content'
        };

        // 设置
        _.options = {};
        // 上下文
        _.$context = $(element);
        // 元素
        _.$navWrap = null;
        _.$contWrap = null;
        _.$navItem = null;
        _.$contItem = null;

        _.init = function (options) {
            _.options = $.extend({}, _.defaults, options);

            _.$navWrap = _.options.nav || _.$context.find(_.defaults.navWrap);
            _.$contWrap = _.options.content || _.$context.find(_.defaults.contWrap);
            // 获取一级子元素
            _.$navItem = _.$navWrap.children();
            _.$contItem = _.$contWrap.children();
            // 初始化显示
            _.showActive(_.options.index);

            _.initNav();
        };

        _.initNav = function () {
            // 绑定事件
            _.$navItem.each(function (index, ele) {
                $(ele)[_.options.trigger](function (e) {
                    e.preventDefault();
                    _.showActive(index);
                })
            });
        };

        // 显示当前
        _.showActive = function (n) {
            var active = _.options.activeClass;

            _.$navItem.removeClass(active)
                .eq(n).addClass(active);
            _.$contItem.removeClass(active).hide()
                .eq(n).addClass(active).show();
        };

        // 初始化
        return _.init(options);
    }

    // jQuery增加插件
    $.fn.beerTab = function (options) {
        return this.each(function () {
            new Tab(this, options);
        });
    }
})(jQuery, window, document);