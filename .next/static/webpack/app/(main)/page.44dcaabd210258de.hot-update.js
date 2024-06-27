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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-client)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _demo_service_ProductService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../demo/service/ProductService */ \"(app-client)/./demo/service/ProductService.tsx\");\n/* harmony import */ var _layout_context_layoutcontext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../layout/context/layoutcontext */ \"(app-client)/./layout/context/layoutcontext.tsx\");\n/* eslint-disable @next/next/no-img-element */ /* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst lineData = {\n    labels: [\n        \"January\",\n        \"February\",\n        \"March\",\n        \"April\",\n        \"May\",\n        \"June\",\n        \"July\"\n    ],\n    datasets: [\n        {\n            label: \"First Dataset\",\n            data: [\n                65,\n                59,\n                80,\n                81,\n                56,\n                55,\n                40\n            ],\n            fill: false,\n            backgroundColor: \"#2f4860\",\n            borderColor: \"#2f4860\",\n            tension: 0.4\n        },\n        {\n            label: \"Second Dataset\",\n            data: [\n                28,\n                48,\n                40,\n                19,\n                86,\n                27,\n                90\n            ],\n            fill: false,\n            backgroundColor: \"#00bb7e\",\n            borderColor: \"#00bb7e\",\n            tension: 0.4\n        }\n    ]\n};\nconst Dashboard = ()=>{\n    _s();\n    const [products, setProducts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const menu1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const menu2 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const [lineOptions, setLineOptions] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});\n    const { layoutConfig } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_layout_context_layoutcontext__WEBPACK_IMPORTED_MODULE_3__.LayoutContext);\n    const applyLightTheme = ()=>{\n        const lineOptions = {\n            plugins: {\n                legend: {\n                    labels: {\n                        color: \"#495057\"\n                    }\n                }\n            },\n            scales: {\n                x: {\n                    ticks: {\n                        color: \"#495057\"\n                    },\n                    grid: {\n                        color: \"#ebedef\"\n                    }\n                },\n                y: {\n                    ticks: {\n                        color: \"#495057\"\n                    },\n                    grid: {\n                        color: \"#ebedef\"\n                    }\n                }\n            }\n        };\n        setLineOptions(lineOptions);\n    };\n    const applyDarkTheme = ()=>{\n        const lineOptions = {\n            plugins: {\n                legend: {\n                    labels: {\n                        color: \"#ebedef\"\n                    }\n                }\n            },\n            scales: {\n                x: {\n                    ticks: {\n                        color: \"#ebedef\"\n                    },\n                    grid: {\n                        color: \"rgba(160, 167, 181, .3)\"\n                    }\n                },\n                y: {\n                    ticks: {\n                        color: \"#ebedef\"\n                    },\n                    grid: {\n                        color: \"rgba(160, 167, 181, .3)\"\n                    }\n                }\n            }\n        };\n        setLineOptions(lineOptions);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        _demo_service_ProductService__WEBPACK_IMPORTED_MODULE_2__.ProductService.getProductsSmall().then((data)=>setProducts(data));\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (layoutConfig.colorScheme === \"light\") {\n            applyLightTheme();\n        } else {\n            applyDarkTheme();\n        }\n    }, [\n        layoutConfig.colorScheme\n    ]);\n    const formatCurrency = (value)=>{\n        var _value;\n        return (_value = value) === null || _value === void 0 ? void 0 : _value.toLocaleString(\"en-US\", {\n            style: \"currency\",\n            currency: \"USD\"\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"h1\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                alt: \"picture\",\n                src: \"https://vimc.co/wp-content/uploads/2020/08/Slide-vimc-3.png\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                lineNumber: 128,\n                columnNumber: 29\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                lineNumber: 128,\n                columnNumber: 115\n            }, undefined),\n            \"About us\",\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                lineNumber: 129,\n                columnNumber: 21\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"h2\",\n                children: \"Our Company\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                lineNumber: 130,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                lineNumber: 131,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"left-column\",\n                children: [\n                    \"Established in 1995 under the Prime Minister's Decision No. 250 / TTg with the mission of being the core and key enterprise of Vietnam's maritime industry. Over 29 years of establishment and development, VIMC is one of leading businesses in opening up cooperation, international integration, providing maritime services on a global scale, making an important contribution to the development of Vietnam's marine economy. VIMC changed to operate as a joint stock company from August 18, 2020\",\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                        lineNumber: 138,\n                        columnNumber: 21\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                        lineNumber: 138,\n                        columnNumber: 26\n                    }, undefined),\n                    \"Vietnamese name: Vietnam Maritime Corporation - Joint Stock Company\",\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                        lineNumber: 139,\n                        columnNumber: 84\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                        lineNumber: 139,\n                        columnNumber: 89\n                    }, undefined),\n                    \"English name: Vietnam Maritime Corporation\",\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                        lineNumber: 140,\n                        columnNumber: 59\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                        lineNumber: 140,\n                        columnNumber: 64\n                    }, undefined),\n                    \"International name: VIMC\",\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                        lineNumber: 141,\n                        columnNumber: 41\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                        lineNumber: 141,\n                        columnNumber: 46\n                    }, undefined),\n                    \"Date of establishment: 29/04/1995\",\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                        lineNumber: 142,\n                        columnNumber: 50\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                        lineNumber: 142,\n                        columnNumber: 55\n                    }, undefined),\n                    \"Address: Ocean Park Building - No.1 Dao Duy Anh, Phuong Mai, Dong Da, Hanoi\"\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                lineNumber: 132,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"right-column\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"iframe\", {\n                    width: \"560\",\n                    height: \"315\",\n                    src: \"https://www.youtube.com/embed/bQogMM1PEpM?si=ilQ260qK59bNktol\",\n                    title: \"YouTube video player\",\n                    frameborder: \"0\",\n                    allow: \"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\",\n                    referrerpolicy: \"strict-origin-when-cross-origin\",\n                    allowfullscreen: true\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                    lineNumber: 146,\n                    columnNumber: 17\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n                lineNumber: 145,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Admin\\\\AndroidStudioProjects\\\\ctms_frontend\\\\app\\\\(main)\\\\page.tsx\",\n        lineNumber: 128,\n        columnNumber: 9\n    }, undefined);\n};\n_s(Dashboard, \"kY9o+19iB/6YJha4vLh8KmQyheU=\");\n_c = Dashboard;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Dashboard);\nvar _c;\n$RefreshReg$(_c, \"Dashboard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VTs7b0JBQWM7a0NBTXJCLDhEQUFDSTs7Ozs7a0NBQUksOERBQUNBOzs7OztvQkFBSTtrQ0FDcUQsOERBQUNBOzs7OztrQ0FBSSw4REFBQ0E7Ozs7O29CQUFJO2tDQUNuQyw4REFBQ0E7Ozs7O2tDQUFJLDhEQUFDQTs7Ozs7b0JBQUk7a0NBQzVCLDhEQUFDQTs7Ozs7a0NBQUksOERBQUNBOzs7OztvQkFBSTtrQ0FDRCw4REFBQ0E7Ozs7O2tDQUFJLDhEQUFDQTs7Ozs7b0JBQUk7Ozs7Ozs7MEJBRy9DLDhEQUFDTDtnQkFBSUMsV0FBVTswQkFDWCw0RUFBQ0s7b0JBQU9DLE9BQU07b0JBQU1DLFFBQU87b0JBQU1KLEtBQUk7b0JBQWdFSyxPQUFNO29CQUF1QkMsYUFBWTtvQkFBSUMsT0FBTTtvQkFBc0dDLGdCQUFlO29CQUFrQ0MsZUFBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJOVU7R0FqSE12QztLQUFBQTtBQW1ITiwrREFBZUEsU0FBU0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvKG1haW4pL3BhZ2UudHN4P2EyNzUiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQG5leHQvbmV4dC9uby1pbWctZWxlbWVudCAqL1xyXG4ndXNlIGNsaWVudCc7XHJcbmltcG9ydCB7QnV0dG9ufSBmcm9tICdwcmltZXJlYWN0L2J1dHRvbic7XHJcbmltcG9ydCB7Q2hhcnR9IGZyb20gJ3ByaW1lcmVhY3QvY2hhcnQnO1xyXG5pbXBvcnQge0NvbHVtbn0gZnJvbSAncHJpbWVyZWFjdC9jb2x1bW4nO1xyXG5pbXBvcnQge0RhdGFUYWJsZX0gZnJvbSAncHJpbWVyZWFjdC9kYXRhdGFibGUnO1xyXG5pbXBvcnQge01lbnV9IGZyb20gJ3ByaW1lcmVhY3QvbWVudSc7XHJcbmltcG9ydCBSZWFjdCwge3VzZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZX0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1Byb2R1Y3RTZXJ2aWNlfSBmcm9tICcuLi8uLi9kZW1vL3NlcnZpY2UvUHJvZHVjdFNlcnZpY2UnO1xyXG5pbXBvcnQge0xheW91dENvbnRleHR9IGZyb20gJy4uLy4uL2xheW91dC9jb250ZXh0L2xheW91dGNvbnRleHQnO1xyXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xyXG5pbXBvcnQge0RlbW99IGZyb20gJ0AvdHlwZXMnO1xyXG5pbXBvcnQge0NoYXJ0RGF0YSwgQ2hhcnRPcHRpb25zfSBmcm9tICdjaGFydC5qcyc7XHJcblxyXG5jb25zdCBsaW5lRGF0YTogQ2hhcnREYXRhID0ge1xyXG4gICAgbGFiZWxzOiBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseSddLFxyXG4gICAgZGF0YXNldHM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnRmlyc3QgRGF0YXNldCcsXHJcbiAgICAgICAgICAgIGRhdGE6IFs2NSwgNTksIDgwLCA4MSwgNTYsIDU1LCA0MF0sXHJcbiAgICAgICAgICAgIGZpbGw6IGZhbHNlLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMmY0ODYwJyxcclxuICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjMmY0ODYwJyxcclxuICAgICAgICAgICAgdGVuc2lvbjogMC40XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnU2Vjb25kIERhdGFzZXQnLFxyXG4gICAgICAgICAgICBkYXRhOiBbMjgsIDQ4LCA0MCwgMTksIDg2LCAyNywgOTBdLFxyXG4gICAgICAgICAgICBmaWxsOiBmYWxzZSxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwYmI3ZScsXHJcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnIzAwYmI3ZScsXHJcbiAgICAgICAgICAgIHRlbnNpb246IDAuNFxyXG4gICAgICAgIH1cclxuICAgIF1cclxufTtcclxuXHJcbmNvbnN0IERhc2hib2FyZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IFtwcm9kdWN0cywgc2V0UHJvZHVjdHNdID0gdXNlU3RhdGU8RGVtby5Qcm9kdWN0W10+KFtdKTtcclxuICAgIGNvbnN0IG1lbnUxID0gdXNlUmVmPE1lbnU+KG51bGwpO1xyXG4gICAgY29uc3QgbWVudTIgPSB1c2VSZWY8TWVudT4obnVsbCk7XHJcbiAgICBjb25zdCBbbGluZU9wdGlvbnMsIHNldExpbmVPcHRpb25zXSA9IHVzZVN0YXRlPENoYXJ0T3B0aW9ucz4oe30pO1xyXG4gICAgY29uc3Qge2xheW91dENvbmZpZ30gPSB1c2VDb250ZXh0KExheW91dENvbnRleHQpO1xyXG5cclxuICAgIGNvbnN0IGFwcGx5TGlnaHRUaGVtZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaW5lT3B0aW9uczogQ2hhcnRPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBwbHVnaW5zOiB7XHJcbiAgICAgICAgICAgICAgICBsZWdlbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNDk1MDU3J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2NhbGVzOiB7XHJcbiAgICAgICAgICAgICAgICB4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNDk1MDU3J1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNlYmVkZWYnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHk6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aWNrczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM0OTUwNTcnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBncmlkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ViZWRlZidcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzZXRMaW5lT3B0aW9ucyhsaW5lT3B0aW9ucyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGFwcGx5RGFya1RoZW1lID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpbmVPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBwbHVnaW5zOiB7XHJcbiAgICAgICAgICAgICAgICBsZWdlbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZWJlZGVmJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2NhbGVzOiB7XHJcbiAgICAgICAgICAgICAgICB4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZWJlZGVmJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3JnYmEoMTYwLCAxNjcsIDE4MSwgLjMpJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZWJlZGVmJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3JnYmEoMTYwLCAxNjcsIDE4MSwgLjMpJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNldExpbmVPcHRpb25zKGxpbmVPcHRpb25zKTtcclxuICAgIH07XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBQcm9kdWN0U2VydmljZS5nZXRQcm9kdWN0c1NtYWxsKCkudGhlbigoZGF0YSkgPT4gc2V0UHJvZHVjdHMoZGF0YSkpO1xyXG4gICAgfSwgW10pO1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGxheW91dENvbmZpZy5jb2xvclNjaGVtZSA9PT0gJ2xpZ2h0Jykge1xyXG4gICAgICAgICAgICBhcHBseUxpZ2h0VGhlbWUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhcHBseURhcmtUaGVtZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFtsYXlvdXRDb25maWcuY29sb3JTY2hlbWVdKTtcclxuXHJcbiAgICBjb25zdCBmb3JtYXRDdXJyZW5jeSA9ICh2YWx1ZTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlPy50b0xvY2FsZVN0cmluZygnZW4tVVMnLCB7XHJcbiAgICAgICAgICAgIHN0eWxlOiAnY3VycmVuY3knLFxyXG4gICAgICAgICAgICBjdXJyZW5jeTogJ1VTRCdcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgxXCI+PGltZyBhbHQ9XCJwaWN0dXJlXCIgc3JjPVwiaHR0cHM6Ly92aW1jLmNvL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDIwLzA4L1NsaWRlLXZpbWMtMy5wbmdcIi8+PGJyLz5cclxuICAgICAgICAgICAgQWJvdXQgdXM8YnIvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgyXCI+T3VyIENvbXBhbnk8L2Rpdj5cclxuICAgICAgICAgICAgPGJyLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZWZ0LWNvbHVtblwiPlxyXG4gICAgICAgICAgICAgICAgRXN0YWJsaXNoZWQgaW4gMTk5NSB1bmRlciB0aGUgUHJpbWUgTWluaXN0ZXIncyBEZWNpc2lvbiBOby4gMjUwIC8gVFRnIHdpdGggdGhlIG1pc3Npb24gb2YgYmVpbmdcclxuICAgICAgICAgICAgICAgIHRoZSBjb3JlIGFuZCBrZXkgZW50ZXJwcmlzZSBvZiBWaWV0bmFtJ3MgbWFyaXRpbWUgaW5kdXN0cnkuIE92ZXIgMjkgeWVhcnMgb2YgZXN0YWJsaXNobWVudCBhbmRcclxuICAgICAgICAgICAgICAgIGRldmVsb3BtZW50LCBWSU1DIGlzIG9uZSBvZiBsZWFkaW5nIGJ1c2luZXNzZXMgaW4gb3BlbmluZyB1cCBjb29wZXJhdGlvbiwgaW50ZXJuYXRpb25hbCBpbnRlZ3JhdGlvbixcclxuICAgICAgICAgICAgICAgIHByb3ZpZGluZyBtYXJpdGltZSBzZXJ2aWNlcyBvbiBhIGdsb2JhbCBzY2FsZSwgbWFraW5nIGFuIGltcG9ydGFudCBjb250cmlidXRpb24gdG8gdGhlIGRldmVsb3BtZW50XHJcbiAgICAgICAgICAgICAgICBvZiBWaWV0bmFtJ3MgbWFyaW5lIGVjb25vbXkuIFZJTUMgY2hhbmdlZCB0byBvcGVyYXRlIGFzIGEgam9pbnQgc3RvY2sgY29tcGFueSBmcm9tIEF1Z3VzdCAxOCxcclxuICAgICAgICAgICAgICAgIDIwMjA8YnIvPjxici8+XHJcbiAgICAgICAgICAgICAgICBWaWV0bmFtZXNlIG5hbWU6IFZpZXRuYW0gTWFyaXRpbWUgQ29ycG9yYXRpb24gLSBKb2ludCBTdG9jayBDb21wYW55PGJyLz48YnIvPlxyXG4gICAgICAgICAgICAgICAgRW5nbGlzaCBuYW1lOiBWaWV0bmFtIE1hcml0aW1lIENvcnBvcmF0aW9uPGJyLz48YnIvPlxyXG4gICAgICAgICAgICAgICAgSW50ZXJuYXRpb25hbCBuYW1lOiBWSU1DPGJyLz48YnIvPlxyXG4gICAgICAgICAgICAgICAgRGF0ZSBvZiBlc3RhYmxpc2htZW50OiAyOS8wNC8xOTk1PGJyLz48YnIvPlxyXG4gICAgICAgICAgICAgICAgQWRkcmVzczogT2NlYW4gUGFyayBCdWlsZGluZyAtIE5vLjEgRGFvIER1eSBBbmgsIFBodW9uZyBNYWksIERvbmcgRGEsIEhhbm9pXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJpZ2h0LWNvbHVtblwiPlxyXG4gICAgICAgICAgICAgICAgPGlmcmFtZSB3aWR0aD1cIjU2MFwiIGhlaWdodD1cIjMxNVwiIHNyYz1cImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkL2JRb2dNTTFQRXBNP3NpPWlsUTI2MHFLNTliTmt0b2xcIiB0aXRsZT1cIllvdVR1YmUgdmlkZW8gcGxheWVyXCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3c9XCJhY2NlbGVyb21ldGVyOyBhdXRvcGxheTsgY2xpcGJvYXJkLXdyaXRlOyBlbmNyeXB0ZWQtbWVkaWE7IGd5cm9zY29wZTsgcGljdHVyZS1pbi1waWN0dXJlOyB3ZWItc2hhcmVcIiByZWZlcnJlcnBvbGljeT1cInN0cmljdC1vcmlnaW4td2hlbi1jcm9zcy1vcmlnaW5cIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlQ29udGV4dCIsInVzZUVmZmVjdCIsInVzZVJlZiIsInVzZVN0YXRlIiwiUHJvZHVjdFNlcnZpY2UiLCJMYXlvdXRDb250ZXh0IiwibGluZURhdGEiLCJsYWJlbHMiLCJkYXRhc2V0cyIsImxhYmVsIiwiZGF0YSIsImZpbGwiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJDb2xvciIsInRlbnNpb24iLCJEYXNoYm9hcmQiLCJwcm9kdWN0cyIsInNldFByb2R1Y3RzIiwibWVudTEiLCJtZW51MiIsImxpbmVPcHRpb25zIiwic2V0TGluZU9wdGlvbnMiLCJsYXlvdXRDb25maWciLCJhcHBseUxpZ2h0VGhlbWUiLCJwbHVnaW5zIiwibGVnZW5kIiwiY29sb3IiLCJzY2FsZXMiLCJ4IiwidGlja3MiLCJncmlkIiwieSIsImFwcGx5RGFya1RoZW1lIiwiZ2V0UHJvZHVjdHNTbWFsbCIsInRoZW4iLCJjb2xvclNjaGVtZSIsImZvcm1hdEN1cnJlbmN5IiwidmFsdWUiLCJ0b0xvY2FsZVN0cmluZyIsInN0eWxlIiwiY3VycmVuY3kiLCJkaXYiLCJjbGFzc05hbWUiLCJpbWciLCJhbHQiLCJzcmMiLCJiciIsImlmcmFtZSIsIndpZHRoIiwiaGVpZ2h0IiwidGl0bGUiLCJmcmFtZWJvcmRlciIsImFsbG93IiwicmVmZXJyZXJwb2xpY3kiLCJhbGxvd2Z1bGxzY3JlZW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-client)/./app/(main)/page.tsx\n"));

/***/ })

});