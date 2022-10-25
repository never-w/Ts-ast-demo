const routes: CustomRouteConfig[] = [
  {
    order: 1,
    path: EXPENSE_DURIAN,
    component: BlankLayout,
    meta: {
      menu: {
        title: '货柜系统费用管理',
      },
    },
    routes: [
      {
        order: 1,
        path: EXPENSE_DURIAN_ORIGIN_PRODUCE_PLACE,
        component: loadable(() => import('@/pages/finance-center/expense-durian/expense-origin/list')),
        authKey: 'OSS_FMS_DURIAN_FILL_IN_FUNCTION_ORIGIN_COST',
        meta: {
          menu: {
            title: '产地费用填写',
          },
          breadcrumb: {
            items: [{ name: '财务中心' }, { name: '货柜系统费用管理' }, { name: '产地费用填写' }],
          },
        },
        routes: [
          {
            path: `${EXPENSE_DURIAN_ORIGIN_PRODUCE_PLACE_INPUT}/:type/:id`,
            component: loadable(() => import('@/pages/finance-center/expense-durian/expense-origin/fill-in')),
            meta: {
              breadcrumb: {
                items: [
                  { name: '财务中心' },
                  { name: '货柜系统费用管理' },
                  {
                    name: '产地费用填写',
                    path: EXPENSE_DURIAN_ORIGIN_PRODUCE_PLACE,
                  },
                  { name: '填写费用' },
                ],
              },
            },
          },
        ],
      },
    ],
  },
]
