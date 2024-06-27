"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/(main)/page",{

/***/ "(app-client)/./app/(main)/page.tsx":
/*!*****************************!*\
  !*** ./app/(main)/page.tsx ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-client)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _demo_service_ProductService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../demo/service/ProductService */ \"(app-client)/./demo/service/ProductService.tsx\");\n/* harmony import */ var _layout_context_layoutcontext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../layout/context/layoutcontext */ \"(app-client)/./layout/context/layoutcontext.tsx\");\n/* eslint-disable @next/next/no-img-element */ /* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst lineData = {\n    labels: [\n        \"January\",\n        \"February\",\n        \"March\",\n        \"April\",\n        \"May\",\n        \"June\",\n        \"July\"\n    ],\n    datasets: [\n        {\n            label: \"First Dataset\",\n            data: [\n                65,\n                59,\n                80,\n                81,\n                56,\n                55,\n                40\n            ],\n            fill: false,\n            backgroundColor: \"#2f4860\",\n            borderColor: \"#2f4860\",\n            tension: 0.4\n        },\n        {\n            label: \"Second Dataset\",\n            data: [\n                28,\n                48,\n                40,\n                19,\n                86,\n                27,\n                90\n            ],\n            fill: false,\n            backgroundColor: \"#00bb7e\",\n            borderColor: \"#00bb7e\",\n            tension: 0.4\n        }\n    ]\n};\nconst Dashboard = ()=>{\n    _s();\n    const [products, setProducts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const menu1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const menu2 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const [lineOptions, setLineOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});\n    const { layoutConfig } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_layout_context_layoutcontext__WEBPACK_IMPORTED_MODULE_3__.LayoutContext);\n    const applyLightTheme = ()=>{\n        const lineOptions = {\n            plugins: {\n                legend: {\n                    labels: {\n                        color: \"#495057\"\n                    }\n                }\n            },\n            scales: {\n                x: {\n                    ticks: {\n                        color: \"#495057\"\n                    },\n                    grid: {\n                        color: \"#ebedef\"\n                    }\n                },\n                y: {\n                    ticks: {\n                        color: \"#495057\"\n                    },\n                    grid: {\n                        color: \"#ebedef\"\n                    }\n                }\n            }\n        };\n        setLineOptions(lineOptions);\n    };\n    const applyDarkTheme = ()=>{\n        const lineOptions = {\n            plugins: {\n                legend: {\n                    labels: {\n                        color: \"#ebedef\"\n                    }\n                }\n            },\n            scales: {\n                x: {\n                    ticks: {\n                        color: \"#ebedef\"\n                    },\n                    grid: {\n                        color: \"rgba(160, 167, 181, .3)\"\n                    }\n                },\n                y: {\n                    ticks: {\n                        color: \"#ebedef\"\n                    },\n                    grid: {\n                        color: \"rgba(160, 167, 181, .3)\"\n                    }\n                }\n            }\n        };\n        setLineOptions(lineOptions);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        _demo_service_ProductService__WEBPACK_IMPORTED_MODULE_2__.ProductService.getProductsSmall().then((data)=>setProducts(data));\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (layoutConfig.colorScheme === \"light\") {\n            applyLightTheme();\n        } else {\n            applyDarkTheme();\n        }\n    }, [\n        layoutConfig.colorScheme\n    ]);\n    const formatCurrency = (value)=>{\n        var _value;\n        return (_value = value) === null || _value === void 0 ? void 0 : _value.toLocaleString(\"en-US\", {\n            style: \"currency\",\n            currency: \"USD\"\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"h1\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                alt: \"picture\",\n                src: \"https://vimc.co/wp-content/uploads/2020/08/Slide-vimc-3.png\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                lineNumber: 128,\n                columnNumber: 29\n            }, undefined),\n            \"About us\",\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                lineNumber: 129,\n                columnNumber: 21\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                children: \"Our Company\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                lineNumber: 130,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n        lineNumber: 128,\n        columnNumber: 9\n    }, undefined);\n};\n_s(Dashboard, \"YUs54HTdfV8Itknnlez0VmFboU0=\");\n_c = Dashboard;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Dashboard);\nvar _c;\n$RefreshReg$(_c, \"Dashboard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Oi8vX05fRS8uL2FwcC8obWFpbikvcGFnZS50c3g/YTI3NSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAbmV4dC9uZXh0L25vLWltZy1lbGVtZW50ICovXHJcbid1c2UgY2xpZW50JztcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAncHJpbWVyZWFjdC9idXR0b24nO1xyXG5pbXBvcnQgeyBDaGFydCB9IGZyb20gJ3ByaW1lcmVhY3QvY2hhcnQnO1xyXG5pbXBvcnQgeyBDb2x1bW4gfSBmcm9tICdwcmltZXJlYWN0L2NvbHVtbic7XHJcbmltcG9ydCB7IERhdGFUYWJsZSB9IGZyb20gJ3ByaW1lcmVhY3QvZGF0YXRhYmxlJztcclxuaW1wb3J0IHsgTWVudSB9IGZyb20gJ3ByaW1lcmVhY3QvbWVudSc7XHJcbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZGVtby9zZXJ2aWNlL1Byb2R1Y3RTZXJ2aWNlJztcclxuaW1wb3J0IHsgTGF5b3V0Q29udGV4dCB9IGZyb20gJy4uLy4uL2xheW91dC9jb250ZXh0L2xheW91dGNvbnRleHQnO1xyXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xyXG5pbXBvcnQgeyBEZW1vIH0gZnJvbSAnQC90eXBlcyc7XHJcbmltcG9ydCB7IENoYXJ0RGF0YSwgQ2hhcnRPcHRpb25zIH0gZnJvbSAnY2hhcnQuanMnO1xyXG5cclxuY29uc3QgbGluZURhdGE6IENoYXJ0RGF0YSA9IHtcclxuICAgIGxhYmVsczogWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknXSxcclxuICAgIGRhdGFzZXRzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ0ZpcnN0IERhdGFzZXQnLFxyXG4gICAgICAgICAgICBkYXRhOiBbNjUsIDU5LCA4MCwgODEsIDU2LCA1NSwgNDBdLFxyXG4gICAgICAgICAgICBmaWxsOiBmYWxzZSxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzJmNDg2MCcsXHJcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnIzJmNDg2MCcsXHJcbiAgICAgICAgICAgIHRlbnNpb246IDAuNFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogJ1NlY29uZCBEYXRhc2V0JyxcclxuICAgICAgICAgICAgZGF0YTogWzI4LCA0OCwgNDAsIDE5LCA4NiwgMjcsIDkwXSxcclxuICAgICAgICAgICAgZmlsbDogZmFsc2UsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMGJiN2UnLFxyXG4gICAgICAgICAgICBib3JkZXJDb2xvcjogJyMwMGJiN2UnLFxyXG4gICAgICAgICAgICB0ZW5zaW9uOiAwLjRcclxuICAgICAgICB9XHJcbiAgICBdXHJcbn07XHJcblxyXG5jb25zdCBEYXNoYm9hcmQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBbcHJvZHVjdHMsIHNldFByb2R1Y3RzXSA9IHVzZVN0YXRlPERlbW8uUHJvZHVjdFtdPihbXSk7XHJcbiAgICBjb25zdCBtZW51MSA9IHVzZVJlZjxNZW51PihudWxsKTtcclxuICAgIGNvbnN0IG1lbnUyID0gdXNlUmVmPE1lbnU+KG51bGwpO1xyXG4gICAgY29uc3QgW2xpbmVPcHRpb25zLCBzZXRMaW5lT3B0aW9uc10gPSB1c2VTdGF0ZTxDaGFydE9wdGlvbnM+KHt9KTtcclxuICAgIGNvbnN0IHsgbGF5b3V0Q29uZmlnIH0gPSB1c2VDb250ZXh0KExheW91dENvbnRleHQpO1xyXG5cclxuICAgIGNvbnN0IGFwcGx5TGlnaHRUaGVtZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5lT3B0aW9uczogQ2hhcnRPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBwbHVnaW5zOiB7XHJcbiAgICAgICAgICAgICAgICBsZWdlbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNDk1MDU3J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2NhbGVzOiB7XHJcbiAgICAgICAgICAgICAgICB4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNDk1MDU3J1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNlYmVkZWYnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHk6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aWNrczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM0OTUwNTcnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBncmlkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ViZWRlZidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzZXRMaW5lT3B0aW9ucyhsaW5lT3B0aW9ucyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGFwcGx5RGFya1RoZW1lID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpbmVPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBwbHVnaW5zOiB7XHJcbiAgICAgICAgICAgICAgICBsZWdlbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZWJlZGVmJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2NhbGVzOiB7XHJcbiAgICAgICAgICAgICAgICB4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZWJlZGVmJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3JnYmEoMTYwLCAxNjcsIDE4MSwgLjMpJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZWJlZGVmJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3JnYmEoMTYwLCAxNjcsIDE4MSwgLjMpJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNldExpbmVPcHRpb25zKGxpbmVPcHRpb25zKTtcclxuICAgIH07XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBQcm9kdWN0U2VydmljZS5nZXRQcm9kdWN0c1NtYWxsKCkudGhlbigoZGF0YSkgPT4gc2V0UHJvZHVjdHMoZGF0YSkpO1xyXG4gICAgfSwgW10pO1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGxheW91dENvbmZpZy5jb2xvclNjaGVtZSA9PT0gJ2xpZ2h0Jykge1xyXG4gICAgICAgICAgICBhcHBseUxpZ2h0VGhlbWUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhcHBseURhcmtUaGVtZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFtsYXlvdXRDb25maWcuY29sb3JTY2hlbWVdKTtcclxuXHJcbiAgICBjb25zdCBmb3JtYXRDdXJyZW5jeSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlPy50b0xvY2FsZVN0cmluZygnZW4tVVMnLCB7XHJcbiAgICAgICAgICAgIHN0eWxlOiAnY3VycmVuY3knLFxyXG4gICAgICAgICAgICBjdXJyZW5jeTogJ1VTRCdcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgxXCI+PGltZyBhbHQ9XCJwaWN0dXJlXCIgc3JjPVwiaHR0cHM6Ly92aW1jLmNvL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDIwLzA4L1NsaWRlLXZpbWMtMy5wbmdcIi8+XHJcbiAgICAgICAgICAgIEFib3V0IHVzPGJyLz5cclxuICAgICAgICAgICAgPGgyPk91ciBDb21wYW55PC9oMj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmQ7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJ1c2VTdGF0ZSIsIlByb2R1Y3RTZXJ2aWNlIiwiTGF5b3V0Q29udGV4dCIsImxpbmVEYXRhIiwibGFiZWxzIiwiZGF0YXNldHMiLCJsYWJlbCIsImRhdGEiLCJmaWxsIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyQ29sb3IiLCJ0ZW5zaW9uIiwiRGFzaGJvYXJkIiwicHJvZHVjdHMiLCJzZXRQcm9kdWN0cyIsIm1lbnUxIiwibWVudTIiLCJsaW5lT3B0aW9ucyIsInNldExpbmVPcHRpb25zIiwibGF5b3V0Q29uZmlnIiwiYXBwbHlMaWdodFRoZW1lIiwicGx1Z2lucyIsImxlZ2VuZCIsImNvbG9yIiwic2NhbGVzIiwieCIsInRpY2tzIiwiZ3JpZCIsInkiLCJhcHBseURhcmtUaGVtZSIsImdldFByb2R1Y3RzU21hbGwiLCJ0aGVuIiwiY29sb3JTY2hlbWUiLCJmb3JtYXRDdXJyZW5jeSIsInZhbHVlIiwidG9Mb2NhbGVTdHJpbmciLCJzdHlsZSIsImN1cnJlbmN5IiwiZGl2IiwiY2xhc3NOYW1lIiwiaW1nIiwiYWx0Iiwic3JjIiwiYnIiLCJoMiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-client)/./app/(main)/page.tsx\n"));

/***/ })

});