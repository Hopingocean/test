export default {
  // 公共数据字典，不允许添加除字典外的数据
  cdd: {
    mat_code: 'Material code',
    mat_name: 'Material name',
    mat_type: 'Material type',
    measure_unit: 'Unit of measurement',
    mat_spec: 'Material specification',
    packing_spec: 'Packing specifications',
    packing_unit: 'Packing unit',
    valid_period: 'Validity period',
    valid_period_usage: 'Validity period of usage',
    validity_period: 'Validity period',
    reinspect_period: 'Re-inspection period',
    batch_num: 'Batch number',
    inventory: 'Inventory',
    total_inventory: 'Total inventory',
    production_date: 'Production date',
    manufacturer: 'Manufacturer',
    manufacturer_batch: 'Manufacturer batch',
    quality_status: 'Quality status',
    test_no: 'Laboratory test report number',
    package_quantity: 'Package quantity',
    subbatch: 'Subbatch',
    subbatch_num: 'Subbatch number',
    storage_position: 'Storage position',
    sub_lot: 'Subbatch',
    product_code: 'Product code',
    product_name: 'Product name',
    product_spec: 'Product specification',
    request_check: 'Application',
    test_report: 'Test report',
    warehouse: 'Warehouse',
    warehouse_name: 'Warehouse name',
    warehouse_code: 'Warehouse code',
    storage_region: 'Storage region',
    storage_area_code: 'Storage area code',
    storage_pos_code: 'Storage position code',
    location_desc: 'Location description',
    apply_department: 'Application department',
    apply_item: 'Application item',
    sample_classify: 'Sample Classification',
    applicant: 'Applicant',
    request_check_task: 'Application task',
    request_check_order: 'Application order',
    request_check_amount: 'Application amount',
    request_check_product: 'Application product',
    request_check_confirm: 'Application confirmation',
    request_check_finished: 'Status of finished application',
    request_check_completed: 'Application completed',
    test_report_order: 'Test report order',
    test_report_task: 'Test report task'
    // raw_mat: 'Raw material',
    // aux_mat: 'Auxiliary material',
    // inner_mat: 'Inner packaging material',
    // outer_mat: 'Outer packaging material',
    // tobe_product: 'Products to be packaged',
    // finished_product: 'Finished products',
    // special_mat: 'Special materials',
    // special_product: 'Special products',
    // intermediate_product: 'Intermediate product',
    // intermediate_products: 'Intermediate products',
    // defect_product: 'Defective products',
    // consumable_mat: 'Consumable material',
    // mat_loss_rate: 'Ingredient loss rate',
    // conv_coef: 'Conversion coefficient',
    // is_inventory_unit: 'Is it an inventory unit',
    // use_content: 'Contents of usage',
    // distributable_quantity: 'Distributable quantity',
    // distribution_status: 'Distribution status',
    // wo_num: 'Work order number',
    // production_batch: 'Production Batch',
    // associated_batch: 'Associated batch',
    // order_type: 'Order type',
    // batch_production: 'Batch production',
    // batch_packing: 'Batch packing',
    // metage: 'Metage',
    // metage_production: 'Metage production',
    // process_program: 'Processing program',
    // order_code: 'Order code',
    // formula: 'Formula',
    // formula_desc: 'Formula description',
    // formula_status: 'Formula status',
    // valid_begin: 'Beginning of validity period',
    // valid_end: 'End of validity period',
    // planned_quantity: 'Planned quantity',
    // reference_quantity: 'Reference quantity',
    // plan_batch: 'Planned batch',
    // plan_batch_quantity: 'Planned batch quantity',
    // plan_feed_quantity: 'Planned feeding amount',
    // error_upper: 'Error in upper limit',
    // error_lower: 'Error in lower limit',
    // plan_start_time: 'Planned start time',
    // plan_end_time: 'Planned end time',
    // main_formula: 'Main formula',
    // main_formula_desc: 'Main formula description',
    // work_center: 'Work center',
    // wo_suspend: 'Work order suspended',
    // wo_terminate: 'Terminate a work order',
    // created: 'Create',
    // published: 'Published',
    // prepared: 'Ready for production',
    // in_production: 'In production',
    // reported: 'Reported',
    // aborted: 'Aborted',
    // deviation_code: 'Deviation code',
    // deviation_code_rule: 'Coding rules of deviation',
    // deviation_level: 'Deviation level',
    // deviation_level_setting: 'Deviation level setting',
    // abnormal: 'Error',
    // minor_deviation: 'Minor deviation',
    // major_deviation: 'Major deviation',
    // significant_deviation: 'Significant deviation',
    // storage_timeout: 'Temporary storage timeout',
    // main_formula_type: 'Main formula type',
    // work_procedure: 'Working procedure',
    // install_process: 'Installation process',
    // operation: 'Operation',
    // work_procedure_record: 'Working procedure records',
    // auto_execution: 'Auto execution',
    // select_start: 'Select start',
    // select_end: 'Select end',
    // parallel_start: 'Parallel start',
    // parallel_finished: 'Parallel finished',
    // judgment: 'Judgment',
    // waiting: 'Waiting',
    // work_report: 'Report',
    // op_confirm: 'Operation confirmation',
    // work_proc_program: 'Working procedure',
    // op_program: 'Running program',
    // feeding: 'Feeding',
    // mat_check: 'Check a material',
    // return_mat: 'Material return',
    // process_output: 'Process output',
    // invent_creation: 'Inventory creation',
    // container_binding: 'Container binding',
    // container_unbinding: 'Container unbinding',
    // device_communication: 'Device communication',
    // esign: 'Electronic signature',
    // tag_jump: 'Tag jump',
    // dry_off: 'Drying',
    // feeding_dry: 'Feeding drying',
    // mat_usage: 'Material usage',
    // mat_loss: 'Material loss',
    // mat_inquiry: 'Material inquiry',
    // mat_balance: 'Material balance',
    // equip_select: 'Select a device',
    // equip_release: 'Release a device',
    // attribute_query: 'Attribute query',
    // attribute_modify: 'Attribute modification',
    // cell_passage: 'Cell passage',
    // critical_data: 'Key data',
    // unit_type: 'Unit type',
    // fixed_quantity: 'Quantification',
    // fixed_unit: 'Fixed unit',
    // equivalent_weigh: 'Equivalent weighing',
    // mat_source: 'Material source',
    // mat_ratio: 'Material ratio',
    // step: 'Step',
    // step_number: 'Step number',
    // step_order: 'Step sequence',
    // dose: 'Dose',
    // is_fixed: 'Fix',
    // is_mixed: 'Mixed batch',
    // error_type: 'Error type',
    // error_unit: 'Error unit',
    // process_step: 'Output steps',
    // weigh_type: 'Metage type',
    // odd: 'Odd',
    // compensation_mat: 'Compensation material',
    // filling_mat: 'Filling material',
    // packaging_mat: 'Packaging material',
    // output_type: 'Output type',
    // workshop_inventory: 'Workshop inventory'
  },
};

