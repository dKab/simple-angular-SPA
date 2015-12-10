/**
 * Created by Dmitry_Kabardinov on 12/5/2015.
 */
'use strict';

/**
 * The goal was to make this directive reusable and self-contained, therefore no implications were made about
 * availability of any 3rd party libraries (e.g. jQuery or lodash). The directive provides api that can be used to hook
 * custom callbacks which will be called after an option has been selected and once option has been removed from selected.
 */
(function () {
  var app = angular.module('courses');

  app.directive('listInput', listInputDirective);

  function listInputDirective() {

    var template = '<div role="listbox">' +
      '<div id="list-input_chosen-options" tabindex="0" aria-label="List of chosen options" class="list-container"><ul>' +
      '</ul></div>' +
      '<div class="buttons-container"><button type="button" id="list-input_remove-btn" aria-label="Remove currently selected option ' +
      'from the list of chosen options and return in to the list of available options">&gt;</button>' +
      '<button type="button" aria-label="Add currently selected option from the list of available options to the list of chosen options"' +
      ' id="list-input_choose-btn">&lt;</button></div>' +
      '<div id="list-input_source-options" tabindex="0" aria-label="List of available options" class="list-container"' +
      '><ul ></ul></div>' +
      '</div>';

    function link(scope, elem, attrs, ngModelCtrl) {
      var source = angular.copy(scope.source),
        chooseBtn = angular.element(document.getElementById('list-input_choose-btn')),
        removeFromChosenBtn = angular.element(document.getElementById('list-input_remove-btn')),
        chosenItemsBlock = angular.element(document.getElementById('list-input_chosen-options')),
        sourceItemsBlock = angular.element(document.getElementById('list-input_source-options')),
        activeChosenItem, activeSourceItem, chosenItems;

      chosenItemsBlock.on('click', selectChosenItem);
      chosenItemsBlock.on('keydown', selectChosenItem);
      sourceItemsBlock.on('click', selectSourceItem);
      sourceItemsBlock.on('keydown', selectSourceItem);
      chooseBtn.on('click', addToChosen);
      sourceItemsBlock.on('keydown', function (event) {
        if (event.keyCode === keyCodes.left || event.keyCode === keyCodes.space) {
          event.preventDefault();
          addToChosen();
        }
      });
      removeFromChosenBtn.on('click', removeFromChosen);
      chosenItemsBlock.on('keydown', function (event) {
        if (event.keyCode === keyCodes.right || event.keyCode === keyCodes.space) {
          event.preventDefault();
          removeFromChosen();
        }
      });

      function render() {
        chosenItems = ngModelCtrl.$modelValue;
        ngModelCtrl.$setViewValue(chosenItems);
        function fillList(item) {
          var containerBlock = this,
            list = containerBlock.find('ul'),
            li = angular.element(document.createElement('li'));
          li.attr({
            'tab-index': "-1",
            'aria-selected': 'false',
            role: 'option'
          });
          li.text(item);
          list.append(li);
        }

        renderChosenBlock();
        renderSourceBlock();

        function renderChosenBlock() {
          chosenItemsBlock.find('ul').empty();
          chosenItems.forEach(fillList, chosenItemsBlock);
        }

        function renderSourceBlock() {
          sourceItemsBlock.find('ul').empty();
          source.forEach(fillList, sourceItemsBlock);
        }
      }

      var keyCodes = {
        space: 32,
        left: 37,
        up: 38,
        right: 39,
        down: 40
      };

      function selectChosenItem(event) {
        var elem;
        if (event.type === 'keydown') {
          elem = selectOptionWithKeyboard(event, chosenItemsBlock);
        } else if (event.type === 'click') {
          elem = selectOptionWithMouse(event);
        }
        if (elem) {
          activeChosenItem = elem;
        }
      }

      function selectSourceItem(event) {
        var elem;
        if (event.type === 'keydown') {
          elem = selectOptionWithKeyboard(event, sourceItemsBlock);
        } else if (event.type === 'click') {
          elem = selectOptionWithMouse(event);
        }
        if (elem) {
          activeSourceItem = elem;
        }
      }

      function selectOptionWithKeyboard(keydownEvent, container) {
        var active = container[0].querySelector('.active'),
          firstItem = container[0].querySelector('li'),
          nextOption, prevOption, wrapped;
        switch (keydownEvent.keyCode) {
          case keyCodes.down:
            keydownEvent.preventDefault();
            if (active) {
              wrapped = angular.element(active);
              wrapped
                .removeClass('active')
                .attr('aria-selected', 'false');
              nextOption = (wrapped.next().length !== 0) ? wrapped.next() : firstItem;
            } else if (firstItem) {
              nextOption = firstItem;
            }
            if (nextOption) {
              return angular.element(nextOption)
                .addClass('active')
                .attr('aria-selected', 'true');
            }
            break;
          case keyCodes.up:
            keydownEvent.preventDefault();
            if (active) {
              wrapped = angular.element(active);
              wrapped
                .removeClass('active')
                .attr('aria-selected', 'false');
              prevOption = active.previousSibling || wrapped.parent().children()[wrapped.parent().children().length - 1];
            } else if (firstItem) {
              prevOption = firstItem;
            }
            if (prevOption) {
              return angular.element(prevOption)
                .addClass('active')
                .attr('aria-selected', 'true');
            }
            break;
        }
      }

      function selectOptionWithMouse(event) {
        var target = event.target;
        if (target.tagName === 'LI') {
          var targetWrapped = angular.element(target);
          var ul = targetWrapped.parent();
          ul.children().removeClass('active').attr('aria-selected', 'false');
          targetWrapped.addClass('active').attr('aria-selected', 'true');
          return targetWrapped;
        }
      }

      function addToChosen() {
        if (activeSourceItem) {
          var dataString = activeSourceItem.text();
          var index = source.indexOf(dataString);
          if (index >= 0) {
            source.splice(index, 1);
            chosenItems.push(dataString);
            render();
            scope.onChoose({author: dataString});
          }
        }
      }

      function removeFromChosen() {
        if (activeChosenItem) {
          var dataString = activeChosenItem.text();
          var index = chosenItems.indexOf(dataString);
          if (index >= 0) {
            chosenItems.splice(index, 1);
            source.push(dataString);
            render();
            scope.onRemove({author: dataString});
          }
        }
      }

      ngModelCtrl.$render = function () {
        source = source.filter(function (val) {
          return ngModelCtrl.$modelValue.indexOf(val) === -1;
        });
        render();
      };
    }

    return {
      restrict: 'E',
      link: link,
      template: template,
      scope: {
        source: '=',
        onChoose: '&chooseCallback',
        onRemove: '&removeCallback'
      },
      require: 'ngModel',
      replace: true
    };
  }
})();
