import {test} from 'node:test';
import assert from 'node:assert/strict';
import {initialValues,normalizePhone,validateStep,toPayload} from '../src/model.ts';
test('Saudi local, international and Arabic digit phone normalization',()=>{for(const value of ['0512345678','٠٥١٢٣٤٥٦٧٨','۰۵۱۲۳۴۵۶۷۸','+966512345678','00966512345678'])assert.equal(normalizePhone(value),'+966512345678');});
test('optional fields can be empty; invalid phone fails',()=>{assert.deepEqual(validateStep({...initialValues,fullName:'اسم',phoneNumber:'0512345678'},0),{});assert.ok(validateStep({...initialValues,fullName:'اسم',phoneNumber:'123'},0).phoneNumber);});
test('salary must be present, finite and positive',()=>{for(const monthlySalary of ['',' ','0','-1','Infinity','abc'])assert.ok(validateStep({...initialValues,monthlySalary},1).monthlySalary);assert.equal(validateStep({...initialValues,monthlySalary:'٥٠٠٠'},1).monthlySalary,undefined);});
test('final step requires finance and obligations fields and accepts either obligations answer',()=>{
 assert.deepEqual(Object.keys(validateStep(initialValues,1)).sort(),['monthlySalary','salaryPaymentMethod','hasFinancialObligations'].sort());
 const values={...initialValues,monthlySalary:'٥٠٠٠',salaryPaymentMethod:'cash' as const};
 assert.deepEqual(Object.keys(validateStep(values,1)),['hasFinancialObligations']);
 for(const hasFinancialObligations of [true,false])assert.deepEqual(validateStep({...values,hasFinancialObligations},1),{});
});
test('payload preserves false, optional omission and normalized numbers',()=>{const payload=toPayload({...initialValues,fullName:' اسم ',phoneNumber:'0512345678',monthlySalary:'٥٠٠٠',salaryPaymentMethod:'cash',hasFinancialObligations:false});assert.deepEqual(payload,{fullName:'اسم',phoneNumber:'+966512345678',monthlySalary:5000,salaryPaymentMethod:'cash',hasFinancialObligations:false});});
