// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
/* ==========================================================
 * bootstrap-affix.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    this.options = $.extend({}, $.fn.affix.defaults, options)
    this.$window = $(window)
      .on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.affix.data-api',  $.proxy(function () { setTimeout($.proxy(this.checkPosition, this), 1) }, this))
    this.$element = $(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
      , scrollTop = this.$window.scrollTop()
      , position = this.$element.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('affix')
        , options = typeof option == 'object' && option
      if (!data) $this.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix

  $.fn.affix.defaults = {
    offset: 0
  }


 /* AFFIX NO CONFLICT
  * ================= */

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


 /* AFFIX DATA-API
  * ============== */

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
        , data = $spy.data()

      data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      $spy.affix(data)
    })
  })


}(window.jQuery);/* ==========================================================
 * bootstrap-alert.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT NO CONFLICT
  * ================= */

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


 /* ALERT DATA-API
  * ============== */

  $(document).on('click.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);/* ============================================================
 * bootstrap-button.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON NO CONFLICT
  * ================== */

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


 /* BUTTON DATA-API
  * =============== */

  $(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
  })

}(window.jQuery);/* ==========================================================
 * bootstrap-carousel.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.options = options
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , to: function (pos) {
      var $active = this.$element.find('.item.active')
        , children = $active.parent().children()
        , activePos = children.index($active)
        , that = this

      if (pos > (children.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activePos == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activePos ? 'next' : 'prev', $(children[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      if (this.$element.find('.next, .prev').length && $.support.transition.end) {
        this.$element.trigger($.support.transition.end)
        this.cycle()
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.item.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      e = $.Event('slide', {
        relatedTarget: $next[0]
      })

      if ($next.hasClass('active')) return

      if ($.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.slide
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL NO CONFLICT
  * ==================== */

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }

 /* CAROUSEL DATA-API
  * ================= */

  $(document).on('click.carousel.data-api', '[data-slide]', function (e) {
    var $this = $(this), href
      , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      , options = $.extend({}, $target.data(), $this.data())
    $target.carousel(options)
    e.preventDefault()
  })

}(window.jQuery);/* =============================================================
 * bootstrap-collapse.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSE PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = typeof option == 'object' && option
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSE NO CONFLICT
  * ==================== */

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


 /* COLLAPSE DATA-API
  * ================= */

  $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
      , option = $(target).data('collapse') ? 'toggle' : $this.data()
    $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    $(target).collapse(option)
  })

}(window.jQuery);/* ============================================================
 * bootstrap-dropdown.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        $parent.toggleClass('open')
      }

      $this.focus()

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) return $this.click()

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)
    $parent.length || ($parent = $this.parent())

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document)
    .on('click.dropdown.data-api touchstart.dropdown.data-api', clearMenus)
    .on('click.dropdown touchstart.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('touchstart.dropdown.data-api', '.dropdown-menu', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api touchstart.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api touchstart.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);/* =========================================================
 * bootstrap-modal.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
            that.$element.focus().trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function (that) {
        this.$element
          .hide()
          .trigger('hidden')

        this.backdrop()
      }

    , removeBackdrop: function () {
        this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.$backdrop.click(
            this.options.backdrop == 'static' ?
              $.proxy(this.$element[0].focus, this.$element[0])
            : $.proxy(this.hide, this)
          )

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) :
            this.removeBackdrop()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.modal

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL NO CONFLICT
  * ================= */

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


 /* MODAL DATA-API
  * ============== */

  $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
      , href = $this.attr('href')
      , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
      , option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option)
      .one('hide', function () {
        $this.focus()
      })
  })

}(window.jQuery);
/* =============================================================
 * bootstrap-scrollspy.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* SCROLLSPY CLASS DEFINITION
  * ========================== */

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && $href.length
              && [[ $href.position().top + self.$scrollElement.scrollTop(), href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu').length)  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY NO CONFLICT
  * ===================== */

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);/* ========================================================
 * bootstrap-tab.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active:last a')[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB NO CONFLICT
  * =============== */

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


 /* TAB DATA-API
  * ============ */

  $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);/* ===========================================================
 * bootstrap-tooltip.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (this.options.trigger != 'manual') {
        eventIn = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })
          .insertAfter(this.$element)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .offset(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)
      self[self.tip().hasClass('in') ? 'hide' : 'show']()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.tooltip

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover'
  , title: ''
  , delay: 0
  , html: false
  }


 /* TOOLTIP NO CONFLICT
  * =================== */

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);/* ===================================================
 * bootstrap-transition.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


  /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

  $(function () {

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);/* =============================================================
 * bootstrap-typeahead.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.source = this.options.source
    this.$menu = $(this.options.menu)
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu
        .insertAfter(this.$element)
        .css({
          top: pos.top + pos.height
        , left: pos.left
        })
        .show()

      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = $.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;')
        isSupported = typeof this.$element[eventName] === 'function'
      }
      return isSupported
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , blur: function (e) {
      var that = this
      setTimeout(function () { that.hide() }, 150)
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  var old = $.fn.typeahead

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD NO CONFLICT
  * =================== */

  $.fn.typeahead.noConflict = function () {
    $.fn.typeahead = old
    return this
  }


 /* TYPEAHEAD DATA-API
  * ================== */

  $(document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
    var $this = $(this)
    if ($this.data('typeahead')) return
    e.preventDefault()
    $this.typeahead($this.data())
  })

}(window.jQuery);
/* ===========================================================
 * bootstrap-popover.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = $e.attr('data-content')
        || (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"></div></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);

/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function(d){function m(a){if(a in j.style)return a;var b=["Moz","Webkit","O","ms"],c=a.charAt(0).toUpperCase()+a.substr(1);if(a in j.style)return a;for(a=0;a<b.length;++a){var d=b[a]+c;if(d in j.style)return d}}function l(a){"string"===typeof a&&this.parse(a);return this}function q(a,b,c,e){var h=[];d.each(a,function(a){a=d.camelCase(a);a=d.transit.propertyMap[a]||d.cssProps[a]||a;a=a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()});-1===d.inArray(a,h)&&h.push(a)});d.cssEase[c]&&(c=d.cssEase[c]);
var f=""+n(b)+" "+c;0<parseInt(e,10)&&(f+=" "+n(e));var g=[];d.each(h,function(a,b){g.push(b+" "+f)});return g.join(", ")}function f(a,b){b||(d.cssNumber[a]=!0);d.transit.propertyMap[a]=e.transform;d.cssHooks[a]={get:function(b){return d(b).css("transit:transform").get(a)},set:function(b,e){var h=d(b).css("transit:transform");h.setFromString(a,e);d(b).css({"transit:transform":h})}}}function g(a,b){return"string"===typeof a&&!a.match(/^[\-0-9\.]+$/)?a:""+a+b}function n(a){d.fx.speeds[a]&&(a=d.fx.speeds[a]);
return g(a,"ms")}d.transit={version:"0.9.9",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:!0,useTransitionEnd:!1};var j=document.createElement("div"),e={},r=-1<navigator.userAgent.toLowerCase().indexOf("chrome");e.transition=m("transition");e.transitionDelay=m("transitionDelay");e.transform=m("transform");e.transformOrigin=m("transformOrigin");j.style[e.transform]=
"";j.style[e.transform]="rotateY(90deg)";e.transform3d=""!==j.style[e.transform];var p=e.transitionEnd={transition:"transitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"}[e.transition]||null,k;for(k in e)e.hasOwnProperty(k)&&"undefined"===typeof d.support[k]&&(d.support[k]=e[k]);j=null;d.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",
easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",
easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};d.cssHooks["transit:transform"]={get:function(a){return d(a).data("transform")||
new l},set:function(a,b){var c=b;c instanceof l||(c=new l(c));a.style[e.transform]="WebkitTransform"===e.transform&&!r?c.toString(!0):c.toString();d(a).data("transform",c)}};d.cssHooks.transform={set:d.cssHooks["transit:transform"].set};"1.8">d.fn.jquery&&(d.cssHooks.transformOrigin={get:function(a){return a.style[e.transformOrigin]},set:function(a,b){a.style[e.transformOrigin]=b}},d.cssHooks.transition={get:function(a){return a.style[e.transition]},set:function(a,b){a.style[e.transition]=b}});f("scale");
f("translate");f("rotate");f("rotateX");f("rotateY");f("rotate3d");f("perspective");f("skewX");f("skewY");f("x",!0);f("y",!0);l.prototype={setFromString:function(a,b){var c="string"===typeof b?b.split(","):b.constructor===Array?b:[b];c.unshift(a);l.prototype.set.apply(this,c)},set:function(a){var b=Array.prototype.slice.apply(arguments,[1]);this.setter[a]?this.setter[a].apply(this,b):this[a]=b.join(",")},get:function(a){return this.getter[a]?this.getter[a].apply(this):this[a]||0},setter:{rotate:function(a){this.rotate=
g(a,"deg")},rotateX:function(a){this.rotateX=g(a,"deg")},rotateY:function(a){this.rotateY=g(a,"deg")},scale:function(a,b){void 0===b&&(b=a);this.scale=a+","+b},skewX:function(a){this.skewX=g(a,"deg")},skewY:function(a){this.skewY=g(a,"deg")},perspective:function(a){this.perspective=g(a,"px")},x:function(a){this.set("translate",a,null)},y:function(a){this.set("translate",null,a)},translate:function(a,b){void 0===this._translateX&&(this._translateX=0);void 0===this._translateY&&(this._translateY=0);
null!==a&&void 0!==a&&(this._translateX=g(a,"px"));null!==b&&void 0!==b&&(this._translateY=g(b,"px"));this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var a=(this.scale||"1,1").split(",");a[0]&&(a[0]=parseFloat(a[0]));a[1]&&(a[1]=parseFloat(a[1]));return a[0]===a[1]?a[0]:a},rotate3d:function(){for(var a=(this.rotate3d||"0,0,0,0deg").split(","),b=0;3>=b;++b)a[b]&&(a[b]=parseFloat(a[b]));
a[3]&&(a[3]=g(a[3],"deg"));return a}},parse:function(a){var b=this;a.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(a,d,e){b.setFromString(d,e)})},toString:function(a){var b=[],c;for(c in this)if(this.hasOwnProperty(c)&&(e.transform3d||!("rotateX"===c||"rotateY"===c||"perspective"===c||"transformOrigin"===c)))"_"!==c[0]&&(a&&"scale"===c?b.push(c+"3d("+this[c]+",1)"):a&&"translate"===c?b.push(c+"3d("+this[c]+",0)"):b.push(c+"("+this[c]+")"));return b.join(" ")}};d.fn.transition=d.fn.transit=function(a,
b,c,f){var h=this,g=0,j=!0;"function"===typeof b&&(f=b,b=void 0);"function"===typeof c&&(f=c,c=void 0);"undefined"!==typeof a.easing&&(c=a.easing,delete a.easing);"undefined"!==typeof a.duration&&(b=a.duration,delete a.duration);"undefined"!==typeof a.complete&&(f=a.complete,delete a.complete);"undefined"!==typeof a.queue&&(j=a.queue,delete a.queue);"undefined"!==typeof a.delay&&(g=a.delay,delete a.delay);"undefined"===typeof b&&(b=d.fx.speeds._default);"undefined"===typeof c&&(c=d.cssEase._default);
b=n(b);var l=q(a,b,c,g),k=d.transit.enabled&&e.transition?parseInt(b,10)+parseInt(g,10):0;if(0===k)return b=j,c=function(b){h.css(a);f&&f.apply(h);b&&b()},!0===b?h.queue(c):b?h.queue(b,c):c(),h;var m={};b=j;c=function(b){this.offsetWidth;var c=!1,g=function(){c&&h.unbind(p,g);0<k&&h.each(function(){this.style[e.transition]=m[this]||null});"function"===typeof f&&f.apply(h);"function"===typeof b&&b()};0<k&&p&&d.transit.useTransitionEnd?(c=!0,h.bind(p,g)):window.setTimeout(g,k);h.each(function(){0<k&&
(this.style[e.transition]=l);d(this).css(a)})};!0===b?h.queue(c):b?h.queue(b,c):c();return this};d.transit.getTransitionValue=q})(jQuery);

// jQuery inview
;(function(d){var p={},e,a,h=document,i=window,f=h.documentElement,j=d.expando;d.event.special.inview={add:function(a){p[a.guid+"-"+this[j]]={data:a,$element:d(this)}},remove:function(a){try{delete p[a.guid+"-"+this[j]]}catch(d){}}};d(i).bind("scroll resize",function(){e=a=null});!f.addEventListener&&f.attachEvent&&f.attachEvent("onfocusin",function(){a=null});setInterval(function(){var k=d(),j,n=0;d.each(p,function(a,b){var c=b.data.selector,d=b.$element;k=k.add(c?d.find(c):d)});if(j=k.length){var b;
if(!(b=e)){var g={height:i.innerHeight,width:i.innerWidth};if(!g.height&&((b=h.compatMode)||!d.support.boxModel))b="CSS1Compat"===b?f:h.body,g={height:b.clientHeight,width:b.clientWidth};b=g}e=b;for(a=a||{top:i.pageYOffset||f.scrollTop||h.body.scrollTop,left:i.pageXOffset||f.scrollLeft||h.body.scrollLeft};n<j;n++)if(d.contains(f,k[n])){b=d(k[n]);var l=b.height(),m=b.width(),c=b.offset(),g=b.data("inview");if(!a||!e)break;c.top+l>a.top&&c.top<a.top+e.height&&c.left+m>a.left&&c.left<a.left+e.width?
(m=a.left>c.left?"right":a.left+e.width<c.left+m?"left":"both",l=a.top>c.top?"bottom":a.top+e.height<c.top+l?"top":"both",c=m+"-"+l,(!g||g!==c)&&b.data("inview",c).trigger("inview",[!0,m,l])):g&&b.data("inview",!1).trigger("inview",[!1])}}},250)})(jQuery);

/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/**
 * jQuery.LocalScroll - Animated scrolling navigation, using anchors.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 * @author Ariel Flesler
 * @version 1.2.7
 **/
;(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);

/*
Updated versions can be found at https://github.com/mikeymckay/google-spreadsheet-javascript
*/var GoogleSpreadsheet, GoogleUrl;
GoogleUrl = (function() {
  function GoogleUrl(sourceIdentifier) {
    this.sourceIdentifier = sourceIdentifier;
    if (this.sourceIdentifier.match(/http(s)*:/)) {
      this.url = this.sourceIdentifier;
      this.gid = "";
      try {
        this.key = this.url.match(/key=(.*?)&/)[1];
      } catch (error) {
        this.key = this.url.match(/(cells|list)\/(.*?)\//)[2];
      }
      try {
        this.gid = this.url.match(/gid=(.*)/)[1];
      } catch (error) {
        this.gid = this.url.match(RegExp("("+ this.key + ")\/(.*?)\/"))[2];
      }
    } else {
      this.key = this.sourceIdentifier;
    }
    this.jsonCellsUrl = "http://spreadsheets.google.com/feeds/cells/" + this.key + "/" + this.gid + "/public/basic?alt=json-in-script";
    this.jsonListUrl = "http://spreadsheets.google.com/feeds/list/" + this.key + "/" + this.gid + "/public/basic?alt=json-in-script";
    this.jsonUrl = this.jsonCellsUrl;
  }
  return GoogleUrl;
})();
GoogleSpreadsheet = (function() {
  function GoogleSpreadsheet() {}
  GoogleSpreadsheet.prototype.load = function(callback) {
    var intervalId, jsonUrl, safetyCounter, url, waitUntilLoaded;
    url = this.googleUrl.jsonCellsUrl + "&callback=GoogleSpreadsheet.callbackCells";
    $('body').append("<script src='" + url + "'/>");
    jsonUrl = this.jsonUrl;
    safetyCounter = 0;
    waitUntilLoaded = function() {
      var result;
      result = GoogleSpreadsheet.find({
        jsonUrl: jsonUrl
      });
      if (safetyCounter++ > 20 || ((result != null) && (result.data != null))) {
        clearInterval(intervalId);
        return callback(result);
      }
    };
    intervalId = setInterval(waitUntilLoaded, 200);
    if (typeof result != "undefined" && result !== null) {
      return result;
    }
  };
  GoogleSpreadsheet.prototype.url = function(url) {
    return this.googleUrl(new GoogleUrl(url));
  };
  GoogleSpreadsheet.prototype.googleUrl = function(googleUrl) {
    if (typeof googleUrl === "string") {
      throw "Invalid url, expecting object not string";
    }
    this.url = googleUrl.url;
    this.key = googleUrl.key;
    this.jsonUrl = googleUrl.jsonUrl;
    return this.googleUrl = googleUrl;
  };
  GoogleSpreadsheet.prototype.save = function() {
    return localStorage["GoogleSpreadsheet." + this.type] = JSON.stringify(this);
  };
  return GoogleSpreadsheet;
})();
GoogleSpreadsheet.bless = function(object) {
  var key, result, value;
  result = new GoogleSpreadsheet();
  for (key in object) {
    value = object[key];
    result[key] = value;
  }
  return result;
};
GoogleSpreadsheet.find = function(params) {
  var item, itemObject, key, value, _i, _len;
  try {
    for (item in localStorage) {
      if (item.match(/^GoogleSpreadsheet\./)) {
        itemObject = JSON.parse(localStorage[item]);
        for (key in params) {
          value = params[key];
          if (itemObject[key] === value) {
            return GoogleSpreadsheet.bless(itemObject);
          }
        }
      }
    }
  } catch (error) {
    for (_i = 0, _len = localStorage.length; _i < _len; _i++) {
      item = localStorage[_i];
      if (item.match(/^GoogleSpreadsheet\./)) {
        itemObject = JSON.parse(localStorage[item]);
        for (key in params) {
          value = params[key];
          if (itemObject[key] === value) {
            return GoogleSpreadsheet.bless(itemObject);
          }
        }
      }
    }
  }
  return null;
};
GoogleSpreadsheet.callbackCells = function(data) {
  var cell, googleSpreadsheet, googleUrl;
  googleUrl = new GoogleUrl(data.feed.id.$t);
  googleSpreadsheet = GoogleSpreadsheet.find({
    jsonUrl: googleUrl.jsonUrl
  });
  if (googleSpreadsheet === null) {
    googleSpreadsheet = new GoogleSpreadsheet();
    googleSpreadsheet.googleUrl(googleUrl);
  }
  googleSpreadsheet.data = (function() {
    var _i, _len, _ref, _results;
    _ref = data.feed.entry;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      cell = _ref[_i];
      _results.push(cell.content.$t);
    }
    return _results;
  })();
  googleSpreadsheet.save();
  return googleSpreadsheet;
};
/* TODO (Handle row based data)
GoogleSpreadsheet.callbackList = (data) ->*/

/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */

(function($) {
  $.transit = {
    version: "0.9.9",

    // Map of $.css() keys to values for 'transitionProperty'.
    // See https://developer.mozilla.org/en/CSS/CSS_transitions#Properties_that_can_be_animated
    propertyMap: {
      marginLeft    : 'margin',
      marginRight   : 'margin',
      marginBottom  : 'margin',
      marginTop     : 'margin',
      paddingLeft   : 'padding',
      paddingRight  : 'padding',
      paddingBottom : 'padding',
      paddingTop    : 'padding'
    },

    // Will simply transition "instantly" if false
    enabled: true,

    // Set this to false if you don't want to use the transition end property.
    useTransitionEnd: false
  };

  var div = document.createElement('div');
  var support = {};

  // Helper function to get the proper vendor property name.
  // (`transition` => `WebkitTransition`)
  function getVendorPropertyName(prop) {
    // Handle unprefixed versions (FF16+, for example)
    if (prop in div.style) return prop;

    var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
    var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

    if (prop in div.style) { return prop; }

    for (var i=0; i<prefixes.length; ++i) {
      var vendorProp = prefixes[i] + prop_;
      if (vendorProp in div.style) { return vendorProp; }
    }
  }

  // Helper function to check if transform3D is supported.
  // Should return true for Webkits and Firefox 10+.
  function checkTransform3dSupport() {
    div.style[support.transform] = '';
    div.style[support.transform] = 'rotateY(90deg)';
    return div.style[support.transform] !== '';
  }

  var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

  // Check for the browser's transitions support.
  support.transition      = getVendorPropertyName('transition');
  support.transitionDelay = getVendorPropertyName('transitionDelay');
  support.transform       = getVendorPropertyName('transform');
  support.transformOrigin = getVendorPropertyName('transformOrigin');
  support.transform3d     = checkTransform3dSupport();

  var eventNames = {
    'transition':       'transitionEnd',
    'MozTransition':    'transitionend',
    'OTransition':      'oTransitionEnd',
    'WebkitTransition': 'webkitTransitionEnd',
    'msTransition':     'MSTransitionEnd'
  };

  // Detect the 'transitionend' event needed.
  var transitionEnd = support.transitionEnd = eventNames[support.transition] || null;

  // Populate jQuery's `$.support` with the vendor prefixes we know.
  // As per [jQuery's cssHooks documentation](http://api.jquery.com/jQuery.cssHooks/),
  // we set $.support.transition to a string of the actual property name used.
  for (var key in support) {
    if (support.hasOwnProperty(key) && typeof $.support[key] === 'undefined') {
      $.support[key] = support[key];
    }
  }

  // Avoid memory leak in IE.
  div = null;

  // ## $.cssEase
  // List of easing aliases that you can use with `$.fn.transition`.
  $.cssEase = {
    '_default':       'ease',
    'in':             'ease-in',
    'out':            'ease-out',
    'in-out':         'ease-in-out',
    'snap':           'cubic-bezier(0,1,.5,1)',
    // Penner equations
    'easeOutCubic':   'cubic-bezier(.215,.61,.355,1)',
    'easeInOutCubic': 'cubic-bezier(.645,.045,.355,1)',
    'easeInCirc':     'cubic-bezier(.6,.04,.98,.335)',
    'easeOutCirc':    'cubic-bezier(.075,.82,.165,1)',
    'easeInOutCirc':  'cubic-bezier(.785,.135,.15,.86)',
    'easeInExpo':     'cubic-bezier(.95,.05,.795,.035)',
    'easeOutExpo':    'cubic-bezier(.19,1,.22,1)',
    'easeInOutExpo':  'cubic-bezier(1,0,0,1)',
    'easeInQuad':     'cubic-bezier(.55,.085,.68,.53)',
    'easeOutQuad':    'cubic-bezier(.25,.46,.45,.94)',
    'easeInOutQuad':  'cubic-bezier(.455,.03,.515,.955)',
    'easeInQuart':    'cubic-bezier(.895,.03,.685,.22)',
    'easeOutQuart':   'cubic-bezier(.165,.84,.44,1)',
    'easeInOutQuart': 'cubic-bezier(.77,0,.175,1)',
    'easeInQuint':    'cubic-bezier(.755,.05,.855,.06)',
    'easeOutQuint':   'cubic-bezier(.23,1,.32,1)',
    'easeInOutQuint': 'cubic-bezier(.86,0,.07,1)',
    'easeInSine':     'cubic-bezier(.47,0,.745,.715)',
    'easeOutSine':    'cubic-bezier(.39,.575,.565,1)',
    'easeInOutSine':  'cubic-bezier(.445,.05,.55,.95)',
    'easeInBack':     'cubic-bezier(.6,-.28,.735,.045)',
    'easeOutBack':    'cubic-bezier(.175, .885,.32,1.275)',
    'easeInOutBack':  'cubic-bezier(.68,-.55,.265,1.55)'
  };

  // ## 'transform' CSS hook
  // Allows you to use the `transform` property in CSS.
  //
  //     $("#hello").css({ transform: "rotate(90deg)" });
  //
  //     $("#hello").css('transform');
  //     //=> { rotate: '90deg' }
  //
  $.cssHooks['transit:transform'] = {
    // The getter returns a `Transform` object.
    get: function(elem) {
      return $(elem).data('transform') || new Transform();
    },

    // The setter accepts a `Transform` object or a string.
    set: function(elem, v) {
      var value = v;

      if (!(value instanceof Transform)) {
        value = new Transform(value);
      }

      // We've seen the 3D version of Scale() not work in Chrome when the
      // element being scaled extends outside of the viewport.  Thus, we're
      // forcing Chrome to not use the 3d transforms as well.  Not sure if
      // translate is affectede, but not risking it.  Detection code from
      // http://davidwalsh.name/detecting-google-chrome-javascript
      if (support.transform === 'WebkitTransform' && !isChrome) {
        elem.style[support.transform] = value.toString(true);
      } else {
        elem.style[support.transform] = value.toString();
      }

      $(elem).data('transform', value);
    }
  };

  // Add a CSS hook for `.css({ transform: '...' })`.
  // In jQuery 1.8+, this will intentionally override the default `transform`
  // CSS hook so it'll play well with Transit. (see issue #62)
  $.cssHooks.transform = {
    set: $.cssHooks['transit:transform'].set
  };

  // jQuery 1.8+ supports prefix-free transitions, so these polyfills will not
  // be necessary.
  if ($.fn.jquery < "1.8") {
    // ## 'transformOrigin' CSS hook
    // Allows the use for `transformOrigin` to define where scaling and rotation
    // is pivoted.
    //
    //     $("#hello").css({ transformOrigin: '0 0' });
    //
    $.cssHooks.transformOrigin = {
      get: function(elem) {
        return elem.style[support.transformOrigin];
      },
      set: function(elem, value) {
        elem.style[support.transformOrigin] = value;
      }
    };

    // ## 'transition' CSS hook
    // Allows you to use the `transition` property in CSS.
    //
    //     $("#hello").css({ transition: 'all 0 ease 0' });
    //
    $.cssHooks.transition = {
      get: function(elem) {
        return elem.style[support.transition];
      },
      set: function(elem, value) {
        elem.style[support.transition] = value;
      }
    };
  }

  // ## Other CSS hooks
  // Allows you to rotate, scale and translate.
  registerCssHook('scale');
  registerCssHook('translate');
  registerCssHook('rotate');
  registerCssHook('rotateX');
  registerCssHook('rotateY');
  registerCssHook('rotate3d');
  registerCssHook('perspective');
  registerCssHook('skewX');
  registerCssHook('skewY');
  registerCssHook('x', true);
  registerCssHook('y', true);

  // ## Transform class
  // This is the main class of a transformation property that powers
  // `$.fn.css({ transform: '...' })`.
  //
  // This is, in essence, a dictionary object with key/values as `-transform`
  // properties.
  //
  //     var t = new Transform("rotate(90) scale(4)");
  //
  //     t.rotate             //=> "90deg"
  //     t.scale              //=> "4,4"
  //
  // Setters are accounted for.
  //
  //     t.set('rotate', 4)
  //     t.rotate             //=> "4deg"
  //
  // Convert it to a CSS string using the `toString()` and `toString(true)` (for WebKit)
  // functions.
  //
  //     t.toString()         //=> "rotate(90deg) scale(4,4)"
  //     t.toString(true)     //=> "rotate(90deg) scale3d(4,4,0)" (WebKit version)
  //
  function Transform(str) {
    if (typeof str === 'string') { this.parse(str); }
    return this;
  }

  Transform.prototype = {
    // ### setFromString()
    // Sets a property from a string.
    //
    //     t.setFromString('scale', '2,4');
    //     // Same as set('scale', '2', '4');
    //
    setFromString: function(prop, val) {
      var args =
        (typeof val === 'string')  ? val.split(',') :
        (val.constructor === Array) ? val :
        [ val ];

      args.unshift(prop);

      Transform.prototype.set.apply(this, args);
    },

    // ### set()
    // Sets a property.
    //
    //     t.set('scale', 2, 4);
    //
    set: function(prop) {
      var args = Array.prototype.slice.apply(arguments, [1]);
      if (this.setter[prop]) {
        this.setter[prop].apply(this, args);
      } else {
        this[prop] = args.join(',');
      }
    },

    get: function(prop) {
      if (this.getter[prop]) {
        return this.getter[prop].apply(this);
      } else {
        return this[prop] || 0;
      }
    },

    setter: {
      // ### rotate
      //
      //     .css({ rotate: 30 })
      //     .css({ rotate: "30" })
      //     .css({ rotate: "30deg" })
      //     .css({ rotate: "30deg" })
      //
      rotate: function(theta) {
        this.rotate = unit(theta, 'deg');
      },

      rotateX: function(theta) {
        this.rotateX = unit(theta, 'deg');
      },

      rotateY: function(theta) {
        this.rotateY = unit(theta, 'deg');
      },

      // ### scale
      //
      //     .css({ scale: 9 })      //=> "scale(9,9)"
      //     .css({ scale: '3,2' })  //=> "scale(3,2)"
      //
      scale: function(x, y) {
        if (y === undefined) { y = x; }
        this.scale = x + "," + y;
      },

      // ### skewX + skewY
      skewX: function(x) {
        this.skewX = unit(x, 'deg');
      },

      skewY: function(y) {
        this.skewY = unit(y, 'deg');
      },

      // ### perspectvie
      perspective: function(dist) {
        this.perspective = unit(dist, 'px');
      },

      // ### x / y
      // Translations. Notice how this keeps the other value.
      //
      //     .css({ x: 4 })       //=> "translate(4px, 0)"
      //     .css({ y: 10 })      //=> "translate(4px, 10px)"
      //
      x: function(x) {
        this.set('translate', x, null);
      },

      y: function(y) {
        this.set('translate', null, y);
      },

      // ### translate
      // Notice how this keeps the other value.
      //
      //     .css({ translate: '2, 5' })    //=> "translate(2px, 5px)"
      //
      translate: function(x, y) {
        if (this._translateX === undefined) { this._translateX = 0; }
        if (this._translateY === undefined) { this._translateY = 0; }

        if (x !== null && x !== undefined) { this._translateX = unit(x, 'px'); }
        if (y !== null && y !== undefined) { this._translateY = unit(y, 'px'); }

        this.translate = this._translateX + "," + this._translateY;
      }
    },

    getter: {
      x: function() {
        return this._translateX || 0;
      },

      y: function() {
        return this._translateY || 0;
      },

      scale: function() {
        var s = (this.scale || "1,1").split(',');
        if (s[0]) { s[0] = parseFloat(s[0]); }
        if (s[1]) { s[1] = parseFloat(s[1]); }

        // "2.5,2.5" => 2.5
        // "2.5,1" => [2.5,1]
        return (s[0] === s[1]) ? s[0] : s;
      },

      rotate3d: function() {
        var s = (this.rotate3d || "0,0,0,0deg").split(',');
        for (var i=0; i<=3; ++i) {
          if (s[i]) { s[i] = parseFloat(s[i]); }
        }
        if (s[3]) { s[3] = unit(s[3], 'deg'); }

        return s;
      }
    },

    // ### parse()
    // Parses from a string. Called on constructor.
    parse: function(str) {
      var self = this;
      str.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(x, prop, val) {
        self.setFromString(prop, val);
      });
    },

    // ### toString()
    // Converts to a `transition` CSS property string. If `use3d` is given,
    // it converts to a `-webkit-transition` CSS property string instead.
    toString: function(use3d) {
      var re = [];

      for (var i in this) {
        if (this.hasOwnProperty(i)) {
          // Don't use 3D transformations if the browser can't support it.
          if ((!support.transform3d) && (
            (i === 'rotateX') ||
            (i === 'rotateY') ||
            (i === 'perspective') ||
            (i === 'transformOrigin'))) { continue; }

          if (i[0] !== '_') {
            if (use3d && (i === 'scale')) {
              re.push(i + "3d(" + this[i] + ",1)");
            } else if (use3d && (i === 'translate')) {
              re.push(i + "3d(" + this[i] + ",0)");
            } else {
              re.push(i + "(" + this[i] + ")");
            }
          }
        }
      }

      return re.join(" ");
    }
  };

  function callOrQueue(self, queue, fn) {
    if (queue === true) {
      self.queue(fn);
    } else if (queue) {
      self.queue(queue, fn);
    } else {
      fn();
    }
  }

  // ### getProperties(dict)
  // Returns properties (for `transition-property`) for dictionary `props`. The
  // value of `props` is what you would expect in `$.css(...)`.
  function getProperties(props) {
    var re = [];

    $.each(props, function(key) {
      key = $.camelCase(key); // Convert "text-align" => "textAlign"
      key = $.transit.propertyMap[key] || $.cssProps[key] || key;
      key = uncamel(key); // Convert back to dasherized

      if ($.inArray(key, re) === -1) { re.push(key); }
    });

    return re;
  }

  // ### getTransition()
  // Returns the transition string to be used for the `transition` CSS property.
  //
  // Example:
  //
  //     getTransition({ opacity: 1, rotate: 30 }, 500, 'ease');
  //     //=> 'opacity 500ms ease, -webkit-transform 500ms ease'
  //
  function getTransition(properties, duration, easing, delay) {
    // Get the CSS properties needed.
    var props = getProperties(properties);

    // Account for aliases (`in` => `ease-in`).
    if ($.cssEase[easing]) { easing = $.cssEase[easing]; }

    // Build the duration/easing/delay attributes for it.
    var attribs = '' + toMS(duration) + ' ' + easing;
    if (parseInt(delay, 10) > 0) { attribs += ' ' + toMS(delay); }

    // For more properties, add them this way:
    // "margin 200ms ease, padding 200ms ease, ..."
    var transitions = [];
    $.each(props, function(i, name) {
      transitions.push(name + ' ' + attribs);
    });

    return transitions.join(', ');
  }
});


  /* -- https://bitbucket.org/AMcBain/bb-code-parser
     --
     --
     -- JS BB-Code Parsing Library
     --
     -- Copyright 2009-2011, A.McBain

      Redistribution and use, with or without modification, are permitted provided that the following
      conditions are met:

         1. Redistributions of source code must retain the above copyright notice, this list of
            conditions and the following disclaimer.
         2. Redistributions of binaries must reproduce the above copyright notice, this list of
            conditions and the following disclaimer in other materials provided with the distribution.
         4. The name of the author may not be used to endorse or promote products derived from this
            software without specific prior written permission.

      THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING,
      BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
      ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
      EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
      OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
      OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
      ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

     --

      While this software is released "as is", I don't mind getting bug reports.
  */

  /*
     Most of the supported code specifications were aquired from here: http://www.bbcode.org/reference.php

     Due to the way this parser/formatter is designed, content of a code is cannot be relied on to be passed
     to the escape function on a code instance in between the calling of the open and close functions. So
     certain things otherwise workable might not be (such as using the content of a link as the argument if
     no argument was given).

     This parser/formatter does not support calling out to anonymous functions (callbacks) when a code with-
     out an implementation is encountered. The parser/formatter would have to accept callbacks for all
     methods available on BBCode (plus an extra parameter for the code name). This is not in the plan to be
     added as a feature. Maybe an adventerous person could attempt this.
  */

  /* Using the BBCodeParser:
    Note any of the inputs shown here can be skipped by sending null instead:
    ex:  new BBCodeParser(null, settings);

    // Replace all defined codes with default settings
    var parser = new BBCodeParser();
    var output = parser.format(input);

    // Replace all allowed codes with default settings
    var allowedCodes = ['b', 'i', 'u'];
    var parser = new BBCodeParser(allowedCodes);
    var output = parser.format(input);

    // Replace all allowed codes with custom settings (not all codes have settings)
    var allowedCodes = ['b', 'i', 'u'];
    var settings = {
      'FontSizeUnit' : 'px'
    };
    var parser = new BBCodeParser(allowedCode, settings);
    var output = parser.format(input);

    // Replace the implementation for 'Bold'
    var allowedCodes = ['b', 'i', 'u'];
    settings = {
      'FontSizeUnit' : 'px'
    };
    var codeImpls = {
      'b' : new HTMLBoldBBCode()
    };
    var parser = new BBCodeParser(allowedCode, settings, codeImpls);
    var output = parser.format(input);
  */


  // Standard interface to be implemented by all "BB-Codes"
  function BBCode() {
    // Name to be displayed, ex: Bold
    this.getCodeName = function() {};
    // Name of the code as written, ex: b
    // Display names *must not* start with /
    this.getDisplayName = function() {};
    // Whether or not this code has an end marker
    // Codes without an end marker should implement the open method, and leave the close method empty
    this.needsEnd = function() {};
    // Demotes whether a code's content should be parsed for other codes
    // Codes such as a [code][/code] block might not want their content parsed for other codes
    this.canHaveCodeContent = function() {};
    // Whether or not this code can have an argument
    this.canHaveArgument = function() {};
    // Whether or not this code must have an argument
    // For consistency, a code which cannot have an argument should return false here
    this.mustHaveArgument = function() {};
    // Denotes whether or not the parser should generate a closing code if the returned opening code is already in effect
    // This is called before a new code of a type is opened. Return null to indicate that no code should be auto closed
    // The code returned should be equivalent to the "display name" of the code to be closed, ex: 'b' not 'Bold'
    // Confusing? ex: '[*]foo, bar [*]baz!' (if auto close code is '*') generates '[*]foo, bar[/*][*]baz!'
    //            An "opening" [*] was recorded, so when it hit the second [*], it inserted a closing [/*] first
    this.getAutoCloseCodeOnOpen = function() {};
    this.getAutoCloseCodeOnClose = function() {};
    // Whether or not the given argument is valid
    // Codes which do not take an argument should return false and those which accept any value should return true
    this.isValidArgument = function(settings, argument/*=null*/) {};
    // Whether or not the actual display name of a code is a valid parent for this code
    // The "actual display name" is 'ul' or 'ol', not "Unordered List", etc.
    // If the code isn't nested, 'GLOBAL' will be passed instead
    this.isValidParent = function(settings, parent/*=null*/) {};
    // Escape content that will eventually be sent to the format function
    // Take care not to escape the content again inside the format function
    this.escape = function(settings, content) {};
    // Returns a statement indicating the opening of something which contains content
    // (whatever that is in the output format/language returned)
    // argument is the part after the equals in some BB-Codes, ex: [url=http://example.org]...[/url]
    // closingCode is used when allowOverlappingCodes is true and contains the code being closed
    //             (this is because all open codes are closed then reopened after the closingCode is closed)
    this.open = function(settings, argument/*=null*/, closingCode/*=null*/) {};
    // Returns a statement indicating the closing of something which contains content
    // whatever that is in the output format/language returned)
    // argument is the part after the equals in some BB-Codes, ex: [url=http://example.org]...[/url]
    // closingCode is used when allowOverlappingCodes is true and cotnains the code being closed
    //             (this is because all open codes are closed then reopened after the closingCode is closed)
    //             null is sent for to the code represented by closingCode (it cannot 'force close' itthis)
    this.close = function(settings, argument/*=null*/, closingCode/*=null*/) {};
  }

  // PHP Compat functions
  this.PHPC = {
    count: function(value) {
      var count = 0;
      for(var i in value) {
        count++;
      }
      return count;
    },
    in_array: function(needle, haystack) {
      var found = false;
      for(var i = 0; i < haystack.length && !found; i++) {
        found = haystack[i] === needle;
      }
      return found;
    },
    floatval: function(value) {
      return parseFloat(value) || 0;
    },
    intval: function(value) {
      var number = Number(value);
      return (isNaN(number))? 0 : number;
    },
    htmlspecialchars: function(value) {
      if(!value) return "";
      return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
  }

  /*
     Sets up the BB-Code parser with the given settings.
     If null is passed for allowed codes, all are allowed. If no settings are passed, defaults are used.
     These parameters are supplimentary and overrides, that is, they are in addition to the defaults
     already included, but they will override an default if found.

     Use null to skip any parameters to set later ones.

     allowedCodes is an array of "display names" (b, i, ...) that are allowed to be parsed and formatted
                    in the output. If null is passed, all default codes are allowed.
         Default: null (allow all defaults)

     settings is a mapped array of settings which various formatter implementations may use to control output.
         Default: null (use built in default settings)

     codes is a mapped array of "display names" to implementations of BBCode which are used to format output.
         Default: null (no supplementary codes)

     supplementDeafults tells the parser whether the given codes are used to supplement default codes (and
                        override existing ones if they exist) or whether they should be the only implementations
                        available to the parser (do not use the defaults).
                        Note: if this is true, and null is passed for codes, NO code imlplementations will be available.
                        Note: if this is true, and no 'GLOBAL' implementation is provided, a default one
                              which does nothing will be provided.
         Default: true (passed in implementation codes supplement defaults)

     allOrNothing refers to what happens when an invalid code is found. If true, it stops returns the input.
                  If false, it keeps on going (output may not display as expected).
                  Codes which are not allowed or codes for which no formatter cannot be found are not invalid.
         Default: true

     handleOverlappingCodes tells the parser to properly (forcefully) handle overlapping codes.
                            This is done by closing open tags which overlap, then reopening them after
                            the closed one. This will only work when allOrNothing is false.
         Default: false

     escapeContentOutput tells the parser whether or not it should escape the contents of BBCodes in the output.
                         Content is any text not directely related to a BBCode itself. [b]this is content[/b]
         Default: true

     codeStartSymbol is the symbol denoting the start of a code (default is [ for easy compatability)
         Default: '['

     codeEndSymbol is the symbol denoting the end of a code (default is ] for easy compatability with BB-Code)
         Default: ']'
  */
  // Class for the BB-Code Parser.
  // Each parser is immutable, each instance's settings, codes, etc, are "final" after the parser is created.
  function BBCodeParser(allowedCodes, settings, codes, supplementDefaults, allOrNothing, handleOverlappingCodes, escapeContentOutput, codeStartSymbol, codeEndSymbol) {

    var _bbCodes = [];

    // Mapped Array with all the default implementations of BBCodes.
    // It is not advised this be edited directly as this will affect all other calls.
    // Instead, pass a Mapped Array of only the codes to be overridden to the BBCodeParser_replace function.
    function setupDefaultCodes() {
      _bbCodes = {
        'GLOBAL'  : new HTMLGlobalBBCode(),
        'b'       : new HTMLBoldBBCode(),
        'i'       : new HTMLItalicBBCode(),
        'u'       : new HTMLUnderlineBBCode(),
        's'       : new HTMLStrikeThroughBBCode(),
        'font'    : new HTMLFontBBCode(),
        'size'    : new HTMLFontSizeBBCode(),
        'color'   : new HTMLColorBBCode(),
        'left'    : new HTMLLeftBBCode(),
        'center'  : new HTMLCenterBBCode(),
        'right'   : new HTMLLeftBBCode(),
        'quote'   : new HTMLQuoteBBCode(),
        'code'    : new HTMLCodeBBCode(),
        'codebox' : new HTMLCodeBoxBBCode(),
        'url'     : new HTMLLinkBBCode(),
        'img'     : new HTMLImageBBCode(),
        'ul'      : new HTMLUnorderedListBBCode(),
        'ol'      : new HTMLOrderedListBBCode(),
        'li'      : new HTMLListItemBBCode(),
        'list'    : new HTMLListBBCode(),
        '*'       : new HTMLStarBBCode()
      };
    }

    // The allowed codes (set up in the constructor)
    var _allowedCodes = [];

    // Mapped Array with properties which can be used by BBCode implementations to affect output.
    // It is not advised this be edited directly as this will affect all other calls.
    // Instead, pass a Mapped Array of only the properties to be overridden to the BBCodeParser_replace function.
    var _settings = {
      'XHTML'                    : false,
      'FontSizeUnit'             : 'pt',
      'FontSizeMax'              : 48, /* Set to null to allow any font-size */
      'ColorAllowAdvFormats'     : false, /* Whether the rgb[a], hsl[a] color formats should be accepted */
      'QuoteTitleBackground'     : '#e4eaf2',
      'QuoteBorder'              : '1px solid gray',
      'QuoteBackground'          : 'white',
      'QuoteCSSClassName'        : 'quotebox-{by}', /* {by} is the quote parameter ex: [quote=Waldo], {by} = Waldo */
      'CodeTitleBackground'      : '#ffc29c',
      'CodeBorder'               : '1px solid gray',
      'CodeBackground'           : 'white',
      'CodeCSSClassName'         : 'codebox-{lang}', /* {lang} is the code parameter ex: [code=PHP], {lang} = php */
      'LinkUnderline'            : true,
      'LinkColor'                : 'blue'
      /*'ImageWidthMax'            : 640,*/ // Uncomment these to tell the BB-Code parser to use them
      /*'ImageHeightMax'           : 480,*/ // The default is to allow any size image
      /*'UnorderedListDefaultType' : 'circle',*/ // Uncomment these to tell the BB-Code parser to use this
      /*'OrderedListDefaultType'   : '1',     */ // default type if the given one is invalid **
      /*'ListDefaultType'          : 'circle' */ // ...
    };
    // ** Note that this affects whether a tag is printed out "as is" if a bad argument is given.
    // It may not affect those tags which can take "" or nothing as their argument
    // (they may assign a relevant default themselves).

    // See the constructor comment for details
    var _allOrNothing = true;
    var _handleOverlappingCodes = false;
    var _escapeContentOutput = true;
    var _codeStartSymbol = '[';
    var _codeEndSymbol = ']';


      /**************************/
     /* START CONSTRUCTOR CODE */
    /**************************/

    if(allowedCodes === undefined) allowedCodes = null;
    if(settings === undefined) settings = null;
    if(supplementDefaults === undefined) supplementDefaults = true;
    if(allOrNothing === undefined) allOrNothing = true;
    if(handleOverlappingCodes === undefined) handleOverlappingCodes = false;
    if(codeStartSymbol === undefined) codeStartSymbol = '[';
    if(codeEndSymbol === undefined) codeEndSymbol = ']';


    if(allOrNothing === true || allOrNothing === false) _allOrNothing = allOrNothing;
    if(handleOverlappingCodes === true || handleOverlappingCodes === false) _handleOverlappingCodes = handleOverlappingCodes;
    if(escapeContentOutput === true || escapeContentOutput === false) _escapeContentOutput = escapeContentOutput;
    if(codeStartSymbol) _codeStartSymbol = codeStartSymbol;
    if(codeEndSymbol) _codeEndSymbol = codeEndSymbol;

    if(PHPC.count(_bbCodes) === 0) {
      setupDefaultCodes();
    }

    // Copy settings
    var key;
    if(!settings) settings = {};
    for(key in settings) {
      value = settings[key];
      _settings[key] = value + '';
    }

    // Copy passed code implementations
    if(!codes) codes = {};
    if(supplementDefaults) {
      for(key in codes) {
        value = codes[key];
        if(value instanceof BBCode) {
          _bbCodes[key] = value;
        }
      }
    } else {
      _bbCodes = codes;

      // If no global bb-code implementation, provide a default one.
      if(!BBCodeParser.isValidKey(_bbCodes, 'GLOBAL') || !(_bbCodes['GLOBAL'] instanceof BBCode)) {
        _bbCodes['GLOBAL'] = new DefaultGlobalBBCode();
      }
    }

    // If allowed codes is null, make it the same as specifying all the codes
    var count = PHPC.count(allowedCodes), i;
    if(count > 0) {
      for(i = 0; i < count; i++) {
        _allowedCodes.push(allowedCodes[i] + '');
      }
    } else if(allowedCodes === null) {
      for(key in _bbCodes) {
        _allowedCodes.push(key + '');
      }
    }

      /************************/
     /* END CONSTRUCTOR CODE */
    /************************/


    // Parses and replaces allowed BBCodes with the settings given when this parser was created
    // allOrNothing, handleOverlapping, and escapeContentOutput can be overridden per call
    this.format = function(input, allOrNothing, handleOverlappingCodes, escapeContentOutput) {

      // Copy over defaults if no overrides given
      if(allOrNothing !== true && allOrNothing !== false) {
        allOrNothing = _allOrNothing;
      }
      if(handleOverlappingCodes !== true && handleOverlappingCodes !== false) {
        handleOverlappingCodes = _handleOverlappingCodes;
      }
      if(escapeContentOutput !== true && escapeContentOutput !== false) {
        escapeContentOutput = _escapeContentOutput;
      }

      // Why bother parsing if there's no codes to find?
      var moreThanDefaultGlobal = PHPC.count(_bbCodes) - ((_bbCodes['GLOBAL'] instanceof DefaultGlobalBBCode)? 1 : 0) > 0;
      if(PHPC.count(_allowedCodes) > 0 && PHPC.count(_bbCodes) > 0 && moreThanDefaultGlobal) {
        return state_replace(input, _allowedCodes, _settings, _bbCodes, allOrNothing, handleOverlappingCodes, escapeContentOutput, _codeStartSymbol, _codeEndSymbol);
      }

      return input;
    };

    function state_replace(input, allowedCodes, settings, codes, allOrNothing, handleOverlappingCodes, escapeContentOutput, codeStartSymbol, codeEndSymbol) {
      var output = '';

      // If no brackets, just dump it back out (don't spend time parsing it)
      if(input.lastIndexOf(codeStartSymbol) !== -1 && input.lastIndexOf(codeEndSymbol) !== -1) {
        var queue = []; // queue of codes and content
        var stack = []; // stack of open codes

        // Iterate over input, finding start symbols
        var tokenizer = new BBCodeParser_MultiTokenizer(input);
        while(tokenizer.hasNextToken(codeStartSymbol)) {
          var before = tokenizer.nextToken(codeStartSymbol);
          var code = tokenizer.nextToken(codeEndSymbol);

          // If "valid" parse further
          if(code !== '') {

            // Store content before code
            if(before !== '') {
              queue.push(new BBCodeParser_Token(BBCodeParser_Token.CONTENT, before));
            }

            // Parse differently depending on whether or not there's an argument
            var codeDisplayName, codeArgument;
            var equals = code.lastIndexOf('=');
            if(equals !== -1) {
              codeDisplayName = code.substr(0, equals);
              codeArgument = code.substr(equals + 1);
            } else {
              codeDisplayName = code;
              codeArgument = null;
            }

            // End codes versus start codes
            var autoCloseCode;
            if(code.substr(0, 1) === '/') {
              var codeNoSlash = codeDisplayName.substr(1);

              // Handle auto closing codes
              if(BBCodeParser.isValidKey(codes, codeNoSlash) && (autoCloseCode = codes[codeNoSlash].getAutoCloseCodeOnClose()) &&
                 BBCodeParser.isValidKey(codes, autoCloseCode) && PHPC.in_array(autoCloseCode, stack)) {

                stack = array_remove(stack, autoCloseCode, true);
                queue.push(new BBCodeParser_Token(BBCodeParser_Token.CODE_END, '/' + autoCloseCode));
              }

              queue.push(new BBCodeParser_Token(BBCodeParser_Token.CODE_END, codeDisplayName));
              codeDisplayName = codeNoSlash;
            } else {

              // Handle auto closing codes
              if(BBCodeParser.isValidKey(codes, codeDisplayName) && (autoCloseCode = codes[codeDisplayName].getAutoCloseCodeOnOpen()) &&
                 BBCodeParser.isValidKey(codes, autoCloseCode) && PHPC.in_array(autoCloseCode, stack)) {

                stack = array_remove(stack, autoCloseCode, true);
                queue.push(new BBCodeParser_Token(BBCodeParser_Token.CODE_END, '/' + autoCloseCode));
              }

              queue.push(new BBCodeParser_Token(BBCodeParser_Token.CODE_START, codeDisplayName, codeArgument));
              stack.push(codeDisplayName);
            }

            // Check for codes with no implementation and codes which aren't allowed
            if(!BBCodeParser.isValidKey(codes, codeDisplayName)) {
              queue[PHPC.count(queue) - 1].status = BBCodeParser_Token.NOIMPLFOUND;
            } else if(!PHPC.in_array(codeDisplayName, allowedCodes)) {
              queue[PHPC.count(queue) - 1].status = BBCodeParser_Token.NOTALLOWED;
            }

          } else if(code === '') {
            queue.push(new BBCodeParser_Token(BBCodeParser_Token.CONTENT, before + '[]'));
          }
        }

        // Get any text after the last end symbold
        var lastBits = input.substr(input.lastIndexOf(codeEndSymbol) + codeEndSymbol.length);
        if(lastBits !== '') {
          queue.push(new BBCodeParser_Token(BBCodeParser_Token.CONTENT, lastBits));
        }

        // Find/mark all valid start/end code pairs
        var count = PHPC.count(queue);
        for(i = 0; i < count; i++) {
          var token = queue[i];

          // Handle undetermined and valid codes
          if(token.status !== BBCodeParser_Token.NOIMPLFOUND && token.status !== BBCodeParser_Token.NOTALLOWED) {

            // Handle start and end codes
            if(token.type === BBCodeParser_Token.CODE_START) {

              // Start codes which don't need an end are valid
              if(!codes[token.content].needsEnd()) {
                token.status = BBCodeParser_Token.VALID;
              }

            } else if(token.type === BBCodeParser_Token.CODE_END) {
              content = token.content.substr(1);

              // Ending codes for items which don't need an end are technically invalid, but since
              // the start code is valid (and this-contained) we'll turn them into regular content
              if(!codes[content].needsEnd()) {
                token.type = BBCodeParser_Token.CONTENT;
                token.status = BBCodeParser_Token.VALID;
              } else {

                // Try our best to handle overlapping codes (they are a real PITA)
                var start;
                if(handleOverlappingCodes) {
                  start = state__findStartCodeOfType(queue, content, i);
                } else {
                  start = state__findStartCodeWithStatus(queue, BBCodeParser_Token.UNDETERMINED, i);
                }

                // Handle valid end codes, mark others invalid
                if(start === false || queue[start].content !== content) {
                  token.status = BBCodeParser_Token.INVALID;
                } else {
                  token.status = BBCodeParser_Token.VALID;
                  token.matches = start;
                  queue[start].status = BBCodeParser_Token.VALID;
                  queue[start].matches = i;
                }
              }
            }
          }

          // If all or nothing, just return the input (as we found 1 invalid code)
          if(allOrNothing && token.status === BBCodeParser_Token.INVALID) {
            return input;
          }
        }

        // Empty the stack
        stack = [];

        // Final loop to print out all the open/close tags as appropriate
        for(i = 0; i < count; i++) {
          var parent, token = queue[i];

          // Escape content tokens via their parent's escaping function
          if(token.type === BBCodeParser_Token.CONTENT) {
            parent = state__findStartCodeWithStatus(queue, BBCodeParser_Token.VALID, i);
            output += (!escapeContentOutput)? token.content : (parent === false || !BBCodeParser.isValidKey(codes, queue[parent].content))? codes['GLOBAL'].escape(settings, token.content) : codes[queue[parent].content].escape(settings, token.content);

          // Handle start codes
          } else if(token.type === BBCodeParser_Token.CODE_START) {
            parent = null;

            // If undetermined or currently valid, validate against various codes rules
            if(token.status !== BBCodeParser_Token.NOIMPLFOUND && token.status !== BBCodeParser_Token.NOTALLOWED) {
              parent = state__findParentStartCode(queue, i);

              if((token.status === BBCodeParser_Token.UNDETERMINED && codes[token.content].needsEnd()) ||
                 (codes[token.content].canHaveArgument() && !codes[token.content].isValidArgument(settings, token.argument)) || 
                 (!codes[token.content].canHaveArgument() && token.argument) ||
                 (codes[token.content].mustHaveArgument() && !token.argument) ||
                 (parent !== false && !codes[queue[parent].content].canHaveCodeContent())) {

                token.status = BBCodeParser_Token.INVALID;
                // Both tokens in the pair should be marked
                if(token.status) {
                  queue[token.matches].status = BBCodeParser_Token.INVALID;
                }

                // AllOrNothing, return input
                if(allOrNothing) return input;
              }

              parent = (parent === false)? 'GLOBAL' : queue[parent].content;
            }

            // Check the parent code too ... some codes are only used within other codes
            if(token.status === BBCodeParser_Token.VALID && codes[token.content].isValidParent(settings, parent)) {
              output += codes[token.content].open(settings, token.argument);

              // Store all open codes
              if(handleOverlappingCodes) stack.push(token);
            } else if(token.argument !== null) {
              output += codeStartSymbol + token.content + '=' + token.argument + codeEndSymbol;
            } else {
              output += codeStartSymbol + token.content + codeEndSymbol;
            }

          // Handle end codes
          } else if(token.type === BBCodeParser_Token.CODE_END) {

            if(token.status === BBCodeParser_Token.VALID) {
              var content = token.content.substr(1);

              // Remove the closing code, close all open codes
              if(handleOverlappingCodes) {
                var scount = PHPC.count(stack);

                // Codes must be closed in the same order they were opened
                for(var j = scount - 1; j >= 0; j--) {
                  var jtoken = stack[j];
                  output += codes[jtoken.content].close(settings, jtoken.argument, (jtoken.content === content)? null : content);
                }

                // Removes matching open code
                stack = array_remove(stack, queue[token.matches], true);
              } else {

                // Close the current code
                output += codes[content].close(settings, token.argument);
              }

              // Now reopen all remaing codes
              if(handleOverlappingCodes) {
                var scount = PHPC.count(stack);

                for(var j = 0; j < scount; j++) {
                  var jtoken = stack[j];
                  output += codes[jtoken.content].open(settings, jtoken.argument, (jtoken.content === content)? null : content);
                }
              }
            } else {
              output += codeStartSymbol + token.content + codeEndSymbol;
            }
          }
        }
      } else {
        output += (!escapeContentOutput)? input : codes['GLOBAL'].escape(settings, input);
      }

      return output;
    };

    // Finds the closest parent with a certain status to the given position, working backwards
    function state__findStartCodeWithStatus(queue, status, position) {
      var found = false;
      var index = -1;

      for(var i = position - 1; i >= 0 && !found; i--) {
        found = queue[i].type === BBCodeParser_Token.CODE_START && queue[i].status === status;
        index = i;
      }

      return (found)? index : false;
    };

    // Finds the closest valid parent with a certain content to the given position, working backwards
    function state__findStartCodeOfType(queue, content, position) {
      var found = false;
      var index = -1;

      for(var i = position - 1; i >= 0 && !found; i--) {
        found = queue[i].type === BBCodeParser_Token.CODE_START &&
                queue[i].status === BBCodeParser_Token.UNDETERMINED &&
          queue[i].content === content;
        index = i;
      }

      return (found)? index : false;
    };

    // Find the parent start-code of another code
    function state__findParentStartCode(queue, position) {
      var found = false;
      var index = -1;

      for(var i = position - 1; i >= 0 && !found; i--) {
        found = queue[i].type === BBCodeParser_Token.CODE_START &&
                queue[i].status === BBCodeParser_Token.VALID &&
          queue[i].matches > position;
        index = i;
      }

      return (found)? index : false;
    };

    // Removes the given value from an array (match found by reference)
    function array_remove(stack, match, first) {
      if(first === undefined) first = false;

      found = false;
      count = PHPC.count(stack);

      for(i = 0; i < count && !found; i++) {
        if(stack[i] === match) {
          stack = stack.splice(stack, i, 1);

          found = true && first;
          count--;
          i--;
        }
      }

      return stack;
    };

  }
  // Whether or not a key in an array is valid or not (is set, and is not null)
  BBCodeParser.isValidKey = function(array, key) {
    return array[key] !== undefined && array[key] !== null;
  };


  /*
     A "multiple token" tokenizer.
     This will not return the text between the last found token and the end of the string,
     as no token will match "end of string". There is no special "end of string" token to
     match against either, as with an arbitrary token to find, how does one know they are
     "one from the end"?
  */
  function BBCodeParser_MultiTokenizer(input, position) {
    var length = 0;

    if(position === undefined) position = 0;
    input = input + '';
    length = input.length;
    position = PHPC.intval(position);

    this.hasNextToken = function(delimiter) {
      if(delimiter === undefined) delimiter = ' ';
      return input.indexOf(delimiter, Math.min(length, position)) !== -1;
    }

    this.nextToken = function(delimiter) {
      if(delimiter === undefined) delimiter = ' ';

      if(position >= length) {
        return false;
      }

      var index = input.indexOf(delimiter, position);
      if(index === -1) {
        index = length;
      }

      var result = input.substr(position, index - position);
      position = index + 1;

      return result;
    }

    this.reset = function() {
      position = false;
    }

  }

  // Class representing a BB-Code-oriented token
  function BBCodeParser_Token(type, content, argument) {

    this.type = BBCodeParser_Token.NONE;
    this.status = BBCodeParser_Token.UNDETERMINED;
    this.content = '';
    this.argument = null;
    this.matches = null; // matching start/end code index

    if(argument === undefined) argument = null;
    this.type = type;
    this.content = content;
    this.status = (this.type === BBCodeParser_Token.CONTENT)? BBCodeParser_Token.VALID : BBCodeParser_Token.UNDETERMINED;
    this.argument = argument;

  }
  BBCodeParser_Token.NONE = 'NONE';
  BBCodeParser_Token.CODE_START = 'CODE_START';
  BBCodeParser_Token.CODE_END = 'CODE_END';
  BBCodeParser_Token.CONTENT = 'CONTENT';

  BBCodeParser_Token.VALID = 'VALID';
  BBCodeParser_Token.INVALID = 'INVALID';
  BBCodeParser_Token.NOTALLOWED = 'NOTALLOWED';
  BBCodeParser_Token.NOIMPLFOUND = 'NOIMPLFOUND';
  BBCodeParser_Token.UNDETERMINED = 'UNDETERMINED';

  function DefaultGlobalBBCode() {
    this.getCodeName = function() { return 'GLOBAL'; }
    this.getDisplayName = function() { return 'GLOBAL'; }
    this.needsEnd = function() { return false; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return false; }
    this.mustHaveArgument = function() { return false; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) { return false; }
    this.isValidParent = function(settings, parent) { return false; }
    this.escape = function(settings, content) { return content; }
    this.open = function(settings, argument, closingCode) { return ''; }
    this.close = function(settings, argument, closingCode) { return ''; }
  }
  DefaultGlobalBBCode.prototype = new BBCode;

    /************************/
   /* HTML implementations */
  /************************/

  function HTMLGlobalBBCode() {
    this.getCodeName = function() { return 'GLOBAL'; }
    this.getDisplayName = function() { return 'GLOBAL'; }
    this.needsEnd = function() { return false; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return false; }
    this.mustHaveArgument = function() { return false; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) { return false; }
    this.isValidParent = function(settings, parent) { return false; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) { return ''; }
    this.close = function(settings, argument, closingCode) { return ''; }
  }
  HTMLGlobalBBCode.prototype = new BBCode;

  function HTMLBoldBBCode() {
    this.getCodeName = function() { return 'Bold'; }
    this.getDisplayName = function() { return 'b'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return false; }
    this.mustHaveArgument = function() { return false; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) { return false; }
    this.isValidParent = function(settings, parent) { return true; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) { return '<b>'; }
    this.close = function(settings, argument, closingCode) { return '</b>'; }
  }
  HTMLBoldBBCode.prototype = new BBCode;

  function HTMLItalicBBCode() {
    this.getCodeName = function() { return 'Italic'; }
    this.getDisplayName = function() { return 'i'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return false; }
    this.mustHaveArgument = function() { return false; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) { return false; }
    this.isValidParent = function(settings, parent) { return true; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) { return '<i>'; }
    this.close = function(settings, argument, closingCode) { return '</i>'; }
  }
  HTMLItalicBBCode.prototype = new BBCode;

  function HTMLUnderlineBBCode() {
    this.getCodeName = function() { return 'Underline'; }
    this.getDisplayName = function() { return 'u'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return false; }
    this.mustHaveArgument = function() { return false; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) { return false; }
    this.isValidParent = function(settings, parent) { return true; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) { return '<u>'; }
    this.close = function(settings, argument, closingCode) { return '</u>'; }
  }
  HTMLUnderlineBBCode.prototype = new BBCode;

  function HTMLStrikeThroughBBCode() {
    this.getCodeName = function() { return 'StrikeThrough'; }
    this.getDisplayName = function() { return 's'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return false; }
    this.mustHaveArgument = function() { return false; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) { return false; }
    this.isValidParent = function(settings, parent) { return true; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) { return '<s>'; }
    this.close = function(settings, argument, closingCode) { return '</s>'; }
  }
  HTMLStrikeThroughBBCode.prototype = new BBCode;

  function HTMLFontSizeBBCode() {
    this.getCodeName = function() { return 'Font Size'; }
    this.getDisplayName = function() { return 'size'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return true; }
    this.mustHaveArgument = function() { return true; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.isValidParent = function(settings, parent) { return true; }
    this.isValidArgument = function(settings, argument) { return PHPC.intval(argument) > 0; }
    this.isValidArgument = function(settings, argument) {
      if(!BBCodeParser.isValidKey(settings, 'FontSizeMax') ||
         (BBCodeParser.isValidKey(settings, 'FontSizeMax') && PHPC.intval(settings['FontSizeMax']) <= 0)) {
        return PHPC.intval(argument) > 0;
      }
      return PHPC.intval(argument) > 0 && PHPC.intval(argument) <= PHPC.intval(settings['FontSizeMax']);
    }
    this.open = function(settings, argument, closingCode) { 
      return '<span style="font-size: ' + PHPC.intval(argument) + PHPC.htmlspecialchars(settings['FontSizeUnit']) + '">';
    }
    this.close = function(settings, argument, closingCode) {
      return '</span>';
    }
  }
  HTMLFontSizeBBCode.prototype = new BBCode;

  function HTMLColorBBCode() {
    var browserColors = {'aliceblue':'1','antiquewhite':'1','aqua':'1','aquamarine':'1','azure':'1','beige':'1','bisque':'1','black':'1','blanchedalmond':'1','blue':'1','blueviolet':'1','brown':'1','burlywood':'1','cadetblue':'1','chartreuse':'1','chocolate':'1','coral':'1','cornflowerblue':'1','cornsilk':'1','crimson':'1','cyan':'1','darkblue':'1','darkcyan':'1','darkgoldenrod':'1','darkgray':'1','darkgreen':'1','darkkhaki':'1','darkmagenta':'1','darkolivegreen':'1','darkorange':'1','darkorchid':'1','darkred':'1','darksalmon':'1','darkseagreen':'1','darkslateblue':'1','darkslategray':'1','darkturquoise':'1','darkviolet':'1','deeppink':'1','deepskyblue':'1','dimgray':'1','dodgerblue':'1','firebrick':'1','floralwhite':'1','forestgreen':'1','fuchsia':'1','gainsboro':'1','ghostwhite':'1','gold':'1','goldenrod':'1','gray':'1','green':'1','greenyellow':'1','honeydew':'1','hotpink':'1','indianred':'1','indigo':'1','ivory':'1','khaki':'1','lavender':'1','lavenderblush':'1','lawngreen':'1','lemonchiffon':'1','lightblue':'1','lightcoral':'1','lightcyan':'1','lightgoldenrodyellow':'1','lightgrey':'1','lightgreen':'1','lightpink':'1','lightsalmon':'1','lightseagreen':'1','lightskyblue':'1','lightslategray':'1','lightsteelblue':'1','lightyellow':'1','lime':'1','limegreen':'1','linen':'1','magenta':'1','maroon':'1','mediumaquamarine':'1','mediumblue':'1','mediumorchid':'1','mediumpurple':'1','mediumseagreen':'1','mediumslateblue':'1','mediumspringgreen':'1','mediumturquoise':'1','mediumvioletred':'1','midnightblue':'1','mintcream':'1','mistyrose':'1','moccasin':'1','navajowhite':'1','navy':'1','oldlace':'1','olive':'1','olivedrab':'1','orange':'1','orangered':'1','orchid':'1','palegoldenrod':'1','palegreen':'1','paleturquoise':'1','palevioletred':'1','papayawhip':'1','peachpuff':'1','peru':'1','pink':'1','plum':'1','powderblue':'1','purple':'1','red':'1','rosybrown':'1','royalblue':'1','saddlebrown':'1','salmon':'1','sandybrown':'1','seagreen':'1','seashell':'1','sienna':'1','silver':'1','skyblue':'1','slateblue':'1','slategray':'1','snow':'1','springgreen':'1','steelblue':'1','tan':'1','teal':'1','thistle':'1','tomato':'1','turquoise':'1','violet':'1','wheat':'1','white':'1','whitesmoke':'1','yellow':'1','yellowgreen':'1'};
    this.getCodeName = function() { return 'Color'; }
    this.getDisplayName = function() { return 'color'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return true; }
    this.mustHaveArgument = function() { return true; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) {
      if(argument === null || argument === undefined) return false;
      if(BBCodeParser.isValidKey(browserColors, argument.toLowerCase()) ||
         argument.match(/^#[\dabcdef]{3}$/i) != null ||
         argument.match(/^#[\dabcdef]{6}$/i) != null) {
        return true;
      }
      if(BBCodeParser.isValidKey(settings, 'ColorAllowAdvFormats') && settings['ColorAllowAdvFormats'] &&
        (argument.match(/^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/i).length > 0 ||
         argument.match(/^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*((0?\.\d+)|1|0)\s*\)$/i).length > 0 ||
         argument.match(/^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}\s+%\)$/i).length > 0 ||
         argument.match(/^hsla\(\s*\d{1,3}\s*,\s*\d{1,3}\s+%,\s*\d{1,3}\s+%,\s*((0?\.\d+)|1|0)\s*\)$/i).length > 0)) {
        return true;
      }
      return false;
    }
    this.isValidParent = function(settings, parent) { return true; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) { 
      return '<span style="color: ' + PHPC.htmlspecialchars(argument) + '">';
    }
    this.close = function(settings, argument, closingCode) {
      return '</span>';
    }
  }
  HTMLColorBBCode.prototype = new BBCode;

  function HTMLFontBBCode() {
    this.getCodeName = function() { return 'Font'; }
    this.getDisplayName = function() { return 'font'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return true; }
    this.mustHaveArgument = function() { return true; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) { return argument !== null; }
    this.isValidParent = function(settings, parent) { return true; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) { 
      return '<span style="font-family: \'' + PHPC.htmlspecialchars(argument) + '\'">';
    }
    this.close = function(settings, argument, closingCode) {
      return '</span>';
    }
  }
  HTMLFontBBCode.prototype = new BBCode;

  function HTMLLeftBBCode() {
    this.getCodeName = function() { return 'Left'; }
    this.getDisplayName = function() { return 'left'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return false; }
    this.mustHaveArgument = function() { return false; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) { return false; }
    this.isValidParent = function(settings, parent) { return true; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      return (closingCode === null)? '<div style="display: block; text-align: left">' : '';
    }
    this.close = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      return (closingCode === null)? '</div>' : '';
    }
  }
  HTMLLeftBBCode.prototype = new BBCode;

  function HTMLCenterBBCode() {
    this.getCodeName = function() { return 'Center'; }
    this.getDisplayName = function() { return 'center'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return false; }
    this.mustHaveArgument = function() { return false; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) { return false; }
    this.isValidParent = function(settings, parent) { return true; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      return (closingCode === null)? '<div style="display: block; text-align: center">' : '';
    }
    this.close = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      return (closingCode === null)? '</div>' : '';
    }
  }
  HTMLCenterBBCode.prototype = new BBCode;

  function HTMLRightBBCode() {
    this.getCodeName = function() { return 'Right'; }
    this.getDisplayName = function() { return 'right'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return false; }
    this.mustHaveArgument = function() { return false; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) { return false; }
    this.isValidParent = function(settings, parent) { return true; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      return (closingCode === null)? '<div style="display: block; text-align: right">' : '';
    }
    this.close = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      return (closingCode === null)? '</div>' : '';
    }
  }
  HTMLRightBBCode.prototype = new BBCode;

  function HTMLQuoteBBCode() {
    this.getCodeName = function() { return 'Quote'; }
    this.getDisplayName = function() { return 'quote'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return true; }
    this.mustHaveArgument = function() { return false; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) { return true; }
    this.isValidParent = function(settings, parent) { return true; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      if(closingCode === null) {
        var box  = '<div style="display: block; margin-bottom: .5em; border: ' + PHPC.htmlspecialchars(settings['QuoteBorder']) + '; background-color: ' + PHPC.htmlspecialchars(settings['QuoteBackground']) + '">';
        box += '<div style="display: block; width: 100%; text-indent: .25em; border-bottom: ' + PHPC.htmlspecialchars(settings['QuoteBorder']) + '; background-color: ' + PHPC.htmlspecialchars(settings['QuoteTitleBackground']) + '">';
        box += 'QUOTE';
        if(argument) box+= ' by ' + PHPC.htmlspecialchars(argument);
        box += '</div>';
        box += '<div ';
        if(argument) box += 'class="' + PHPC.htmlspecialchars(settings['QuoteCSSClassName'].replace('{by}', argument));
        box += 'style="overflow-x: auto; padding: .25em">';
        return box;
      }
    }
    this.close = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      return (closingCode === null)? '</div></div>' : '';
    }
  }
  HTMLQuoteBBCode.prototype = new BBCode;

  function HTMLCodeBBCode() {
    this.getCodeName = function() { return 'Code'; }
    this.getDisplayName = function() { return 'code'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return false; }
    this.canHaveArgument = function() { return true; }
    this.mustHaveArgument = function() { return false; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) { return true; }
    this.isValidParent = function(settings, parent) { return true; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      if(closingCode === null) {
        var box  = '<div style="display: block; margin-bottom: .5em; border: ' + PHPC.htmlspecialchars(settings['CodeBorder']) + '; background-color: ' + PHPC.htmlspecialchars(settings['CodeBackground']) + '">';
        box += '<div style="display: block; width: 100%; text-indent: .25em; border-bottom: ' + PHPC.htmlspecialchars(settings['CodeBorder']) + '; background-color: ' + PHPC.htmlspecialchars(settings['CodeTitleBackground']) + '">';
        box += 'CODE';
        if(argument) box+= ' (' + PHPC.htmlspecialchars(argument) + ')';
        box += '</div><pre ';
        if(argument) box += 'class="' + PHPC.htmlspecialchars(str_replace('{lang}', argument, settings['CodeCSSClassName'])) + '" ';
        box += 'style="overflow-x: auto; margin: 0; font-family: monospace; white-space: pre-wrap; padding: .25em">';
        return box;
      }
      return '';
    }
    this.close = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      return (closingCode === null)? '</pre></div>' : '';
    }
  }
  HTMLCodeBBCode.prototype = new BBCode;

  function HTMLCodeBoxBBCode() {
    this.getCodeName = function() { return 'Code Box'; }
    this.getDisplayName = function() { return 'codebox'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return false; }
    this.canHaveArgument = function() { return true; }
    this.mustHaveArgument = function() { return false; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) { return true; }
    this.isValidParent = function(settings, parent) { return true; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      if(closingCode === null) {
        var box  = '<div style="display: block; margin-bottom: .5em; border: ' + PHPC.htmlspecialchars(settings['CodeBorder']) + '; background-color: ' + PHPC.htmlspecialchars(settings['CodeBackground']) + '">';
        box += '<div style="display: block; width: 100%; text-indent: .25em; border-bottom: ' + PHPC.htmlspecialchars(settings['CodeBorder']) + '; background-color: ' + PHPC.htmlspecialchars(settings['CodeTitleBackground']) + '">';
        box += 'CODE';
        if(argument) box+= ' (' + PHPC.htmlspecialchars(argument) + ')';
        box += '</div><pre ';
        if(argument) box += 'class="' + PHPC.htmlspecialchars(str_replace('{lang}', argument, settings['CodeCSSClassName'])) + '" ';
        box += 'style="height: 29ex; overflow-y: auto; margin: 0; font-family: monospace; white-space: pre-wrap; padding: .25em">';
        return box;
      }
      return '';
    }
    this.close = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      return (closingCode === null)? '</pre></div>' : '';
    }
  }
  HTMLCodeBoxBBCode.prototype = new BBCode;

  function HTMLLinkBBCode() {
    this.getCodeName = function() { return 'Link'; }
    this.getDisplayName = function() { return 'url'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return true; }
    this.mustHaveArgument = function() { return true; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) { return true; }
    this.isValidParent = function(settings, parent) { return true; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) {
      var decoration = (!BBCodeParser.isValidKey(settings, 'LinkUnderline') || settings['LinkUnderline'])? 'underline' : 'none';
      return '<a style="text-decoration: ' + decoration + '; color: ' + PHPC.htmlspecialchars(settings['LinkColor']) + '" href="' + PHPC.htmlspecialchars(argument) + '">';
    }
    this.close = function(settings, argument, closingCode) {
      return '</a>';
    }
  }
  HTMLLinkBBCode.prototype = new BBCode;

  function HTMLImageBBCode() {
    this.getCodeName = function() { return 'Image'; }
    this.getDisplayName = function() { return 'img'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return false; }
    this.canHaveArgument = function() { return true; }
    this.mustHaveArgument = function() { return false; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) {
      if(argument === null || argument === undefined) return true;
      var args = argument.split('x');
      return PHPC.count(args) === 2 && PHPC.floatval(args[0]) === floor(PHPC.floatval(args[0])) && PHPC.floatval(args[1]) === floor(PHPC.floatval(args[1]));
    }
    this.isValidParent = function(settings, parent) { return true; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      return (closingCode === null)? '<img src="' : '';
    }
    this.close = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      if(closingCode === null) {
        if(argument) {
          var args = argument.split('x');
          var width = PHPC.intval(args[0]);
          var height = PHPC.intval(args[1]);

          if(BBCodeParser.isValidKey(settings, 'ImageMaxWidth') && PHPC.intval(settings['ImageMaxWidth']) !== 0) {
            width = Math.min(width, PHPC.intval(settings['ImageMaxWidth']));
          }
          if(BBCodeParser.isValidKey(settings, 'ImageMaxHeight') && PHPC.intval(settings['ImageMaxHeight']) !== 0) {
            height = Math.min(height, PHPC.intval(settings['ImageMaxHeight']));
          }
          return '" alt="image" style="width: ' + width + '; height: ' + height + '"' + ((settings['XHTML'])? '/>' : '>');
        }
        return '" alt="image"' + ((settings['XHTML'])? '/>' : '>');
      }
      return '';
    }
  }
  HTMLImageBBCode.prototype = new BBCode;

  function HTMLUnorderedListBBCode() {
    var types = {
      'circle' : 'circle',
      'disk'   : 'disk',
      'square' : 'square'
    };
    this.getCodeName = function() { return 'Unordered List'; }
    this.getDisplayName = function() { return 'ul'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return true; }
    this.mustHaveArgument = function() { return false; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) {
      if(argument === null || argument === undefined) return true;
      return BBCodeParser.isValidKey(types, argument);
    }
    this.isValidParent = function(settings, parent) { return true; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      if(closingCode === null) {
        var key = null;

        if(BBCodeParser.isValidKey(types, argument)) key = types[argument];
        if(!key && BBCodeParser.isValidKey(types, 'UnorderedListDefaultType') && BBCodeParser.isValidKey(types, 'UnorderedListDefaultType')) {
          argument = types[settings['UnorderedListDefaultType']];
        }
        if(!key) argument = types['circle'];

        return '<ul style="list-style-type: ' + PHPC.htmlspecialchars(key) + '">';
      }
      return '';
    }
    this.close = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      return (closingCode === null)? '</ul>' : '';
    }
  }
  HTMLUnorderedListBBCode.prototype = new BBCode;


  function HTMLOrderedListBBCode() {
    var types = {
      '1'      : 'decimal',
      'a'      : 'lower-alpha',
      'A'      : 'upper-alpha',
      'i'      : 'lower-roman',
      'I'      : 'upper-roman'
    };
    this.getCodeName = function() { return 'Unordered List'; }
    this.getDisplayName = function() { return 'ol'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return true; }
    this.mustHaveArgument = function() { return false; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) {
      if(argument === null || argument === undefined) return true;
      return BBCodeParser.isValidKey(types, argument);
    }
    this.isValidParent = function(settings, parent) { return true; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      if(closingCode === null) {
        var key = null;

        if(BBCodeParser.isValidKey(types, argument)) key = types[argument];
        if(!key && BBCodeParser.isValidKey(types, 'OrderedListDefaultType') && BBCodeParser.isValidKey(types, 'OrderedListDefaultType')) {
          argument = types[settings['OrderedListDefaultType']];
        }
        if(!key) argument = types['1'];

        return '<ol style="list-style-type: ' + PHPC.htmlspecialchars(key) + '">';
      }
      return '';
    }
    this.close = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      return (closingCode === null)? '</ol>' : '';
    }
  }
  HTMLOrderedListBBCode.prototype = new BBCode;


  function HTMLListItemBBCode() {
    this.getCodeName = function() { return 'List Item'; }
    this.getDisplayName = function() { return 'li'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return false; }
    this.mustHaveArgument = function() { return false; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) { return false; }
    this.isValidParent = function(settings, parent) {
      return parent === 'ul' || parent === 'ol';
    }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) { return '<li>'; }
    this.close = function(settings, argument, closingCode) { return '</li>'; }
  }
  HTMLListItemBBCode.prototype = new BBCode;

  function HTMLListBBCode() {
    var ul_types = {
      'circle' : 'circle',
      'disk'   : 'disk',
      'square' : 'square'
    };
    var ol_types = {
      '1'      : 'decimal',
      'a'      : 'lower-alpha',
      'A'      : 'upper-alpha',
      'i'      : 'lower-roman',
      'I'      : 'upper-roman'
    };
    this.getCodeName = function() { return 'List'; }
    this.getDisplayName = function() { return 'list'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return true; }
    this.mustHaveArgument = function() { return false; }
    this.getAutoCloseCodeOnOpen = function() { return null; }
    this.getAutoCloseCodeOnClose = function() { return '*'; }
    this.isValidArgument = function(settings, argument) {
      if(argument === null || argument === undefined) return true;
      return BBCodeParser.isValidKey(ol_types, argument) ||
             BBCodeParser.isValidKey(ul_types, argument);
    }
    this.isValidParent = function(settings, parent) { return true; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      if(closingCode === null) {
        key = getType(settings, argument);
        return '<' + ((BBCodeParser.isValidKey(ol_types, key))? 'ol' : 'ul') + ' style="list-style-type: ' + PHPC.htmlspecialchars(argument) + '">';
      }
      return '';
    }
    this.close = function(settings, argument, closingCode) {
      if(closingCode === undefined) closingCode = null;
      if(closingCode === null) {
        var key = getType(settings, argument);
        return '</' + ((BBCodeParser.isValidKey(ol_types, key))? 'ol' : 'ul') + '>';
      }
      return '';
    }
    function getType(settings, argument) {
      var key = null;

      if(BBCodeParser.isValidKey(ul_types, argument)) {
        key = ul_types[argument];
      }
      if(!key && BBCodeParser.isValidKey(ol_types, argument)) {
        key = ol_types[argument];
      }
      if(!key && BBCodeParser.isValidKey(ul_types, 'ListDefaultType')) {
        key = ul_types[settings['ListDefaultType']];
      }
      if(!key && BBCodeParser.isValidKey(settings, 'ListDefaultType')) {
        key = ol_types[settings['ListDefaultType']];
      }
      if(!key) key = ul_types['circle'];

      return key;
    }
  }
  HTMLListBBCode.prototype = new BBCode;

  function HTMLStarBBCode() {
    this.getCodeName = function() { return 'Star'; }
    this.getDisplayName = function() { return '*'; }
    this.needsEnd = function() { return true; }
    this.canHaveCodeContent = function() { return true; }
    this.canHaveArgument = function() { return false; }
    this.mustHaveArgument = function() { return false; }
    this.getAutoCloseCodeOnOpen = function() { return '*'; }
    this.getAutoCloseCodeOnClose = function() { return null; }
    this.isValidArgument = function(settings, argument) { return false; }
    this.isValidParent = function(settings, parent) { return true; }
    this.escape = function(settings, content) { return PHPC.htmlspecialchars(content); }
    this.open = function(settings, argument, closingCode) { return '<li>'; }
    this.close = function(settings, argument, closingCode) { return '</li>'; }
  }
  HTMLStarBBCode.prototype = new BBCode;
