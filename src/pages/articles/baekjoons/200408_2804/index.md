---
title: "[백준] 2804 : 크로스워드 만들기"
date: "2020-04-08"
layout: post
draft: false
path: "/posts/baekjoons/2804/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 2804번 문제 : 크로스워드 만들기"
---

# 2804번 : 크로스워드 만들기

👉 [문제 바로가기](https://www.acmicpc.net/problem/2804)


## 배경 지식
- `반복문` :  제어문 중 하나로, 프로그램 소스 코드내에서 특정한 부분의 코드가 반복적으로 수행될 수 있도록 하는 구문

## 푼 방법
매일 백준에서 문제를 풀어 나갈 때마다 느끼는 것인데, 알고리즘 푸는 능력도 중요하지만 문제를 이해하는 독해 능력도 정말 중요한 것 같다. 이 문제도 처음에 문제를 제대로 이해하지 못해서 틀렸다. **독해 능력을 기르자. (실수를 최소화하자.)**

A 와 B 단어를 입력받고, A 단어를 기준으로 B 단어와 공통된 글자를 갖는지 체크한다. 왜 A를 기준으로 찾을까? 문제에서 주어진 규칙을 보면 A는 가로(행)으로 놓여야 하고, B는 세로(열)로 놓여야 한다. 또한 공통된 글자가 여럿일 경우 제일 먼저 등장하는 글자를 선택해야 하는데 **2차원 배열을 출력할 때 있어서 행이 outer iteration (바깥 반복문)이기 때문이다.**

공통된 글자를 찾았으면 그 좌표를 row_idx와 col_idx로 저장하고, A 단어(row)와 B 단어(col)의 길이만큼 2차원 배열을 출력한다. **이때 A 단어는 row_idx에서, B 단어는 col_idx에서 출력하고 나머지는 '.'으로 출력한다.**


## 내 정답 코드 (C++)

~~~c
#include <iostream>
#include <string>

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	std::string a, b;
	int row_idx, col_idx;
	
	std::cin >> a >> b;
	
	for (int i = 0; i < a.length(); ++i) {
		if (b.find(a[i]) != -1) {
			row_idx = b.find(a[i]);
			col_idx = i;
			break;
		}
	}
	
	for (int i = 0; i < b.length(); ++i) {
		for (int j = 0; j < a.length(); ++j) {
			if (i != row_idx && j != col_idx)
				std::cout << ".";
			else if (i == row_idx) {
				std::cout << a;
				break;
			}
			else if (j == col_idx)
				std::cout << b[i];
		}
		std::cout << '\n';
	}
	
	return 0;
}
~~~
