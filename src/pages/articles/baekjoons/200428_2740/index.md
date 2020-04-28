---
title: "[백준] 2740 : 행렬 곱셈"
date: "2020-04-28"
layout: post
draft: false
path: "/posts/baekjoons/2740/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 2740번 문제 : 행렬 곱셈"
---

# 2740번 : 행렬 곱셈

👉 [문제 바로가기](https://www.acmicpc.net/problem/2740)


## 배경 지식
 - `분할 정복(Divide and Conquer)` : 그대로 해결할 수 없는 주어진 문제를 **더 이상 문제를 나눌 수 없을 때까지 둘 이상의 작은 부분 문제로 분할하여 문제를 해결**하고, **구해진 문제들을 원 문제로 병합하여 해결**하는 알고리즘
 - `알고리즘 점화식` : **어떤 함수를 자신보다 더 작은 변수에 대한 함수와의 관계로 표현한 식**

## 푼 방법
행렬의 곱셈에 이용되는 점화식을 기반으로 분할 정복 알고리즘을 사용하여 해결하였다.  

#### C[a_row][b_col] += A[a_row][k] * B[k][b_col]  
  
어렵지 않게 풀 수 있다.


## 내 정답 코드 (C++)

~~~c
#include <iostream>

int a[100][100], b[100][100];

int daq(const int& a_row, const int&b_col, const int& a_col_b_row) {
	int sum = 0;
	for (int common_idx = 0; common_idx < a_col_b_row; ++common_idx)
		sum+= a[a_row][common_idx] * b[common_idx][b_col];
		
	return sum;
}

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int a_row, a_col, b_row, b_col;
	
	std::cin >> a_row >> a_col;
	
	for (int i = 0; i < a_row; ++i) {
		for (int j = 0; j < a_col; ++j)
			std::cin >> a[i][j];
	}
	
	std::cin >> b_row >> b_col;
	
	for (int i = 0; i < b_row; ++i) {
		for (int j = 0; j < b_col; ++j)
			std::cin >> b[i][j];
	}
	
	for (int a_r = 0; a_r < a_row; ++a_r) {
		for (int b_c = 0; b_c < b_col; ++b_c)
			std::cout << daq(a_r, b_c, a_col) << " "; // a_col == b_row
		std::cout << '\n';
	}
	
	std::cout << std::endl;
	
	return 0;
}
~~~


### References
https://blog.naver.com/PostView.nhn?blogId=ehdqlstkrl&logNo=220871911909&parentCategoryNo=&categoryNo=8&viewDate=&isShowPopularPosts=false&from=postView  