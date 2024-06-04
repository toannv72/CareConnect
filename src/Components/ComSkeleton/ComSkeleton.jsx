import React from 'react'
import { Skeleton } from 'moti/skeleton'
import { View, StyleSheet } from "react-native";

const ComSkeleton = ({ children, avatar, lines, image, show, direction }) => {
  return (
    <>
      {show ? (
        <Skeleton.Group >
          <View style={[styles.container, {flexDirection: direction=='column'?'column': 'row'}]}>
            {image && ( //if user want to display image
              <Skeleton colorMode="light" width={70} height={70} radius="square" />
            )}
            {avatar && (  //if user want to display avatar
              <Skeleton colorMode="light" width={50} height={50} radius="round" />
            )}
            <View style={styles.textContainer}>
              {[...Array(lines)].map((_, index) => ( //Dùng toán tử spread để tạo mảng mới với các phần tử undefined
                <Skeleton colorMode="light" key={index} width="100%" height={15} radius={5} />
              ))}
            </View>
          </View>
        </Skeleton.Group >

      ) : (
        <View>{children}</View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 20
  },
  textContainer: {
    flex: 1,
    gap: 10
  },
});

export default ComSkeleton;
